const path = require('path');

module.exports = {
    i18n: {
        locales: ['az', 'en', 'ru'],
        defaultLocale: 'az',
        localeDetection: false,
        localePath: path.resolve('./public/locales'), // Ensure this points to the locales folder
        defaultNS: 'common',                          // Default namespace
    },
};
