import { CompilerOptions, enableProdMode, NgModuleRef, NgZone, PlatformRef, Type } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";

export declare const require: any;

export type Options = {
    packageJson: unknown,
    production: boolean,
    platformFactory?: () => PlatformRef,
    compilerOptions?: CompilerOptions & BootstrapOptions,
    cacheKey?: (string) => string,
};

declare interface BootstrapOptions {
    ngZone?: NgZone | 'zone.js' | 'noop';
    ngZoneEventCoalescing?: boolean;
    ngZoneRunCoalescing?: boolean;
}

export type PlatformCache = {
    // TODO: correct to platform
    plattform: { [key: string]: PlatformRef }
};

export function getMajor(version: string): string {
    const pre = version.match(/\d+/)[0];
    const post = version.match(/-.*/);

    if (!pre) {
        throw new Error('Cound not identify major version: ' + version);
    }

    if (post) {
        return pre + post[0];
    }

    return pre;
}

function getPlatformCache(): PlatformCache {
    const platformCache = window as unknown as PlatformCache;
    platformCache.plattform = platformCache.plattform || {};
    return platformCache;
}

function getNgZone(): NgZone {
    return window['ngZone'];
}   

export function bootstrap<M>(module: Type<M>, options: Options): Promise<NgModuleRef<M>> {

    if (!options.packageJson['dependencies'] || !options.packageJson['dependencies']['@angular/core']) {
        throw new Error('Could not find dependency @angular/core in package.json');
    }

    if (!options.platformFactory) {
        options.platformFactory = () => platformBrowser();
    }

    if (!options.compilerOptions?.ngZone) {
        options.compilerOptions = options.compilerOptions || {};
        options.compilerOptions.ngZone = getNgZone();
    }

    if (!options.cacheKey) {
        options.cacheKey = key => key;
    }

    const version = options.packageJson['dependencies']['@angular/core'];
    const key = options.cacheKey(version); 
    const platformCache = getPlatformCache();

    let platform = platformCache.plattform[key];
    if (!platform) {
        platform = options.platformFactory();
        platformCache.plattform[key] = platform; 

        if (options.production) {
            enableProdMode();
        }
    }

    return platform.bootstrapModule(module, options.compilerOptions);
}