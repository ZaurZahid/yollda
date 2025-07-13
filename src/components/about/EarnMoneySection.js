import { useTranslation } from "next-i18next";

// const earnServices = [
//   {
//     id: 1,
//     title: "Azərbaycanda sürücülük edin və pul qazanın",
//     description:
//       "Handle light vehicles or heavy loads—choose jobs that fit your rig and schedule.",
//     buttonText: "Register to Tow",
//     image:
//       "https://images.pexels.com/photos/3964704/pexels-photo-3964704.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
//   {
//     id: 2,
//     title: "Offer tire, battery & fuel services",
//     description:
//       "You choose when and where to help days, evenings, weekends, or whenever you're free.",
//     buttonText: "Register to Tow",
//     image:
//       "https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=800",
//   },
// ];

export default function EarnMoneySection({ aboutList }) {
  const { t } = useTranslation("common");
  return (
    <section className="w-full flex justify-center text-white py-16 lg:py-20 lg:pb-28">
      <div className="max-w-[1440px] w-full px-6 sm:px-8 md:px-16 lg:px-20">
        <div className="flex flex-col text-center">
          {/* Main Heading */}
          <h2 className="lg:w-[70%] mx-auto font-secondary text-h2-responsive uppercase font-extrabold text-green-dark">
            {t("about_page.earn_money_section.heading")}
          </h2>

          {/* Description */}
          <p className="lg:w-[40%] mx-auto text-p-responsive mt-6 text-gray-400">
            {t("about_page.earn_money_section.description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-12 lg:space-y-16 mt-12 lg:mt-28">
          {aboutList.map((service, index) => (
            <div
              key={service?.id}
              className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center`}
            >
              {/* Image */}
              <div className={`md:col-start-1`}>
                <div className="relative overflow-hidden rounded-2xl shadow-xl group">
                  <img
                    src={service?.image}
                    alt={service?.title}
                    className="w-full h-80 lg:h-[32rem] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Content */}
              <div className={`space-y-4 lg:space-y-6 md:col-start-2`}>
                {/* Title */}
                <h4 className="lg:w-[80%] text-h4-responsive font-bold text-green-dark">
                  {service?.title}
                </h4>

                {/* Description */}
                <p className="lg:w-[70%] text-p-large-responsive text-dark-gray">
                  {service?.description}
                </p>

                {/* CTA Button */}
                <div className="mt-2 lg:mt-4">
                  <a
                    href={service?.deeplink_url}
                    className="inline-flex text-light-green"
                  >
                    {service?.action_title}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
