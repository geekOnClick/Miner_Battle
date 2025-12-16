import { Configuration } from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildResolver(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src
        }
    };
}
