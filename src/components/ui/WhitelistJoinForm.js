import React, { useState } from 'react';
import SmsIcon from './icons/Sms';
import UserIcon from './icons/User';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import ArrowDown from './icons/ArrowDown';
import ArrowIcon from './icons/Arrow';
import { useTranslation } from 'next-i18next';
import RadioSelect from './RadioSelect';
import PhoneIcon from './icons/Phone';
import { useRouter } from 'next/router';

const WhitelistJoinForm = ({ centers, onSuccess, isModal }) => {
    const { t } = useTranslation('common');
    const { i18n } = useTranslation();
    const router = useRouter();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: "",
        userType: 'seller',
        shoppingCenter: [],
        errors: {},
        loading: false,
        successMessage: null,
    });

    const optionsMenu = centers.map((center) => ({
        value: center.id,
        label: center.name,
    }));

    const options = [
        { value: 'seller', label: t('onboarding.options.seller') },
        { value: 'buyer', label: t('onboarding.options.buyer') },
    ];

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
        } else if (field === 'userType' && value === 'buyer') {
            // Reset shoppingCenter if userType is buyer
            setFormState((prevState) => ({
                ...prevState,
                userType: value,
                shoppingCenter: [],
                errors: { ...prevState.errors, shoppingCenter: null },
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

    const hasErrors = () =>
        Object.values(formState.errors).some((error) => error && error.trim() !== '');

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/support/whitelist/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept-Language': i18n?.language || 'az' },
                body: JSON.stringify({
                    fullname: formState.name,
                    email: formState.email,
                    phone: formattedPhone,
                    user_type: formState.userType,
                    shopping_center: formState.shoppingCenter,
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
                            shoppingCenter: errorData.shopping_center?.[0] || null,
                        },
                        loading: false,
                    }));
                } else {
                    throw new Error('Unexpected error');
                }
                return;
            }

            // Call onSuccess if provided
            if (onSuccess) onSuccess();

            setFormState({
                name: '',
                email: '',
                phone: '',
                userType: 'seller',
                shoppingCenter: [],
                errors: {},
                loading: false,
                successMessage: t('joinListModal.success_message.title'),
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormState((prevState) => ({ ...prevState, loading: false }));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row">
                <RadioSelect
                    options={options}
                    selectedOption={formState.userType}
                    onChange={(value) => handleChange('userType', value)}
                />
            </div>

            <div className="w-full md:flex mt-6">
                <Input
                    IconComponent={
                        <UserIcon
                            strokeColor={
                                formState.errors.name ? 'stroke-red-400' : 'stroke-blue-800'
                            }
                        />
                    }
                    type="text"
                    label={t('form.name')}
                    placeholder={t('form.name_placeholder')}
                    value={formState.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={formState.errors.name}
                    required
                    classes={{ root: 'md:mr-4', input: 'bg-transparent' }}
                />
                <Input
                    IconComponent={
                        <SmsIcon
                            strokeColor={
                                formState.errors.email ? 'stroke-red-400' : 'stroke-blue-800'
                            }
                        />
                    }
                    type="email"
                    label={t('form.email')}
                    placeholder={t('form.email_placeholder')}
                    value={formState.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={formState.errors.email}
                    required
                    classes={{ root: 'mt-4 md:mt-0', input: 'bg-transparent' }}
                />
            </div>
            <Input
                IconComponent={
                    <PhoneIcon
                        fillColor={
                            formState.errors.phone ? 'fill-red-400' : 'fill-blue-800'
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
                classes={{ root: 'mt-4', input: 'bg-transparent' }}
            />
            {formState.userType === 'seller' &&
                <Select
                    multiple
                    IconComponent={
                        <ArrowDown
                            strokeColor={
                                formState.errors.shoppingCenter ? 'stroke-red-400' : 'stroke-blue-800'
                            }
                        />
                    }
                    label={t('form.trade_center')}
                    value={formState.shoppingCenter}
                    onChange={(e) => handleChange('shoppingCenter', e.target.value)}
                    options={optionsMenu}
                    placeholder={t('form.select')}
                    error={formState.errors.shoppingCenter}
                    required
                    classes={{
                        root: 'mt-4',
                        select: 'bg-transparent',
                        option: 'text-gray-700',
                    }}
                />
            }
            <div className="w-full md:flex mt-8">
                <Button
                    text={
                        formState.loading
                            ? t('buttons.sending')
                            : isModal ? t('buttons.join_the_list') : t('buttons.register_now')
                    }
                    IconComponent={<ArrowIcon strokeColor="stroke-white" />}
                    type="submit"
                    disabled={formState.loading || hasErrors()}
                    classes={`bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap h-11 ${formState.loading || hasErrors()
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                        }`}
                />
                {!isModal &&
                    <Button
                        text={t('buttons.about_us')}
                        IconComponent={<ArrowIcon strokeColor="stroke-black" />}
                        onClick={() => router.push('/#about')}
                        classes={
                            'mt-6 md:mt-0 md:ml-6 bg-gray-200 hover:bg-gray-300 text-black whitespace-nowrap h-11'
                        }
                    />
                }
            </div>
            {formState.successMessage && (
                <p className="mt-4 text-green-500">{formState.successMessage}</p>
            )}
        </form>
    );
};

export default WhitelistJoinForm;
