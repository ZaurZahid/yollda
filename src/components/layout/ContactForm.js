import { useState } from "react";
import UserIcon from './../ui/icons/User';
import Input from './../ui/Input';
import SmsIcon from './../ui/icons/Sms';
import ArrowIcon from "../ui/icons/Arrow";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import { useTranslation } from 'next-i18next';
import PhoneIcon from "../ui/icons/Phone";

export default function ContactForm({ siteData }) {
    const { t } = useTranslation('common');
    const { i18n } = useTranslation();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: "",
        message: '',
        errors: {},
        loading: false,
        successMessage: null,
    });

    const handleChange = (field, value) => {
        if (field === 'phone') {
            // Remove all non-digit characters
            const onlyNumbers = value.replace(/\D/g, '');

            // Limit input to 9 digits
            const trimmedValue = onlyNumbers.slice(0, 9);

            // Dynamically format the value as xx xxx xx xx
            const formattedValue = trimmedValue
                .replace(/(\d{2})(\d{0,3})(\d{0,2})(\d{0,2})/, (_, g1, g2, g3, g4) => {
                    return [g1, g2, g3, g4].filter(Boolean).join(' ');
                });

            // Update the form state
            setFormState((prevState) => ({
                ...prevState,
                phone: formattedValue,
                errors: { ...prevState.errors, [field]: null },
            }));
        } else {
            // General handler for other fields
            setFormState((prevState) => ({
                ...prevState,
                [field]: value,
                errors: { ...prevState.errors, [field]: null },
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFormState((prevState) => ({
            ...prevState,
            loading: true,
            successMessage: null,
            errors: {},
        }));

        const formattedPhone = `994${formState.phone.replace(/\s+/g, '')}`;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/support/contact/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept-Language': i18n?.language || 'az' },
                body: JSON.stringify({
                    fullname: formState.name,
                    email: formState.email,
                    phone: formattedPhone,
                    message: formState.message,
                }),
            });

            if (!response.ok) {
                if (response.status === 422) {
                    const errorData = await response.json();
                    setFormState((prevState) => ({
                        ...prevState,
                        errors: {
                            name: errorData.fullname?.[0] || null,
                            email: errorData.email?.[0] || null,
                            phone: errorData.phone?.[0] || null,
                            message: errorData.message?.[0] || null,
                        },
                        loading: false,
                    }));
                } else {
                    throw new Error('Unexpected error');
                }
                return;
            }

            setFormState({
                name: '',
                email: '',
                phone: '',
                message: '',
                errors: {},
                loading: false,
                successMessage: t('joinListModal.success_message.title'),
            });
        } catch (error) {
            console.error('Error sending contact message:', error);
            setFormState((prevState) => ({ ...prevState, loading: false }));
        }
    };

    const hasErrors = () => Object.values(formState.errors).some((error) => error && error.trim() !== '');

    return (
        <section id="contact" className="py-8 lg:py-16">
            <div className="flex flex-wrap lg:flex-nowrap gap-12">
                {/* Left Section */}
                <div className="flex items-center lg:max-w-md">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {siteData?.[0]?.title}
                        </h2>
                        <p className="text-gray-600 mb-8 lg:mb-10">
                            {siteData?.[0]?.content}
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-green-500">
                                    <img src="/Phone.svg" alt="Phone number" />
                                </div>
                                <div>
                                    <h6 className="text-gray-600 text-xs mb-1">
                                        {t('contactUsSection.contactMethods.phone.label')}
                                    </h6>
                                    <p className="text-gray-900 font-medium">
                                        {siteData?.[0]?.phone}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-blue-500">
                                    <img src="/Letter.svg" alt="Email" />
                                </div>
                                <div>
                                    <h6 className="text-gray-600 text-xs mb-1">
                                        {t('contactUsSection.contactMethods.email.label')}
                                    </h6>
                                    <p className="text-gray-900 font-medium">
                                        {siteData?.[0]?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section (Form) */}
                <div className="bg-white flex-grow rounded-3xl shadow-lg p-6 lg:p-8 lg:ml-4 xl:ml-8">
                    <form onSubmit={handleSubmit}>
                        <div className="w-full md:flex">
                            <Input
                                IconComponent={
                                    <UserIcon strokeColor={formState.errors.name ? "stroke-red-400" : "stroke-current"} />
                                }
                                type="text"
                                label={t('form.name')}
                                placeholder={t('form.name_placeholder')}
                                value={formState.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                error={formState.errors.name}
                                required
                                classes={{ root: "md:mr-4", input: 'bg-gray-100' }}
                            />
                            <Input
                                IconComponent={
                                    <SmsIcon strokeColor={formState.errors.email ? "stroke-red-400" : "stroke-current"} />
                                }
                                type="email"
                                label={t('form.email')}
                                placeholder={t('form.email_placeholder')}
                                value={formState.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                error={formState.errors.email}
                                required
                                classes={{ root: "mt-4 md:mt-0", input: 'bg-gray-100' }}
                            />
                        </div>
                        <Input
                IconComponent={
                    <PhoneIcon
                        fillColor={
                            formState.errors.phone ? 'fill-red-400' : 'fill-current'
                        }
                    />
                }
                IconStartComponent={
                    <img src={`/az-flag.png`} alt={`az flag`} className="w-5 h-5" />
                }
                type="text"
                label={t('contactUsSection.contactMethods.phoneNumber.label')}
                placeholder={'XX XXX XX XX'}
                value={formState.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                error={formState.errors.phone}
                required
                classes={{ root: 'mt-4', input: 'bg-gray-100' }}
            />
                        <Textarea
                            label={t('form.message')}
                            placeholder={t('form.message_placeholder')}
                            value={formState.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            error={formState.errors.message}
                            required
                            classes={{ root: "mt-4", input: 'bg-gray-100' }}
                            maxLength="200"
                        />
                        <Button
                            text={formState.loading ? t('buttons.sending') : t('buttons.send_now')}
                            IconComponent={<ArrowIcon strokeColor="stroke-white" />}
                            type="submit"
                            disabled={formState.loading || hasErrors()}
                            classes={`mt-8 text-white bg-blue-600 hover:bg-blue-700`}
                        />
                        {formState.successMessage && (
                            <p className="mt-4 text-green-500">{formState.successMessage}</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
