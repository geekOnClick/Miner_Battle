import { Configuration, DefinePlugin } from 'webpack';
import webpack from 'webpack';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const isDev = options.mode === 'development';
    const isProd = options.mode === 'production';
    const { mode, paths, analyzer, platform } = options;

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __ENV__: JSON.stringify(mode)
        }),
        new ForkTsCheckerWebpackPlugin()
    ];

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        plugins.push(new MiniCssExtractPlugin());
    }
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin());
        plugins.push(
            new CopyPlugin({
                patterns: [{ from: path.resolve(paths.public, 'locales'), to: paths.output }]
            })
        );
    }
    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    return plugins;
}
