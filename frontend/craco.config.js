const CracoAntDesignPlugin = require('craco-antd');

const themeOverrides = require('./src/app/theme/theme-overrides');

// Don't open the browser during development
process.env.BROWSER = 'none';

const CSS_MODULE_LOCAL_IDENT_NAME_DEV = '[name]__[local]___[hash:base64:5]';
const CSS_MODULE_LOCAL_IDENT_NAME_PROD = '[hash:base64:5]';

module.exports = function({ env }) {
    const isProduction = env === 'production';

    return {
        style: {
            modules: {
                localIdentName: isProduction ? CSS_MODULE_LOCAL_IDENT_NAME_PROD : CSS_MODULE_LOCAL_IDENT_NAME_DEV,
            },
            css: {
                loaderOptions: {
                    localsConvention: 'camelCase',
                },
            },
        },
        plugins: [
            {
                plugin: CracoAntDesignPlugin,
                options: {
                    customizeTheme: themeOverrides(),
                },
            },
        ],
        devServer: {
            proxy: getProxyConfig(),
        },
        webpack: {
            alias: {
                app: `${__dirname}/src/app`,
            }
        }
    };
};

function getProxyConfig() {
    return {
        [`/api`]: {
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {
                [`^/api`]: "/",
            }
        },
    };
}
