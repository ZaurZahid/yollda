export const formatDate = (dateString, locale = 'en') => {
    // formatDate('2022-03-08 15:02:06', 'en'); // "March 8, 2022"
    // formatDate('2022-03-08 15:02:06', 'az'); // "mart 8, 2022"
    // formatDate('2022-03-08 15:02:06', 'ar'); // "مارس ٨, ٢٠٢٢"

    const date = new Date(dateString.replace(' ', 'T'));

    const months = {
        en: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        az: [
            'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
            'iyul', 'avqust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'
        ],
        ar: [
            'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
            'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
        ]
    };

    const selectedMonths = months[locale] || months['en'];

    const day = date.getDate();
    const month = selectedMonths[date.getMonth()];
    const year = date.getFullYear();

    if (locale === 'ar') {
        const toArabicNumber = (n) =>
            n.toString().replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

        return `${month} ${toArabicNumber(day)}, ${toArabicNumber(year)}`;
    }

    return `${month} ${day}, ${year}`;
};
