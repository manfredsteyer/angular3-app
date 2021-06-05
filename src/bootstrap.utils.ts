import { CompilerOptions, enableProdMode, NgModuleRef, NgZone, PlatformRef, Type } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";

export declare const require: any;

export type Options = {
    packageJson: unknown,
    production: boolean,
    platformFactory?: () => PlatformRef,
    compilerOptions?: CompilerOptions & BootstrapOptions
};

declare interface BootstrapOptions {
    ngZone?: NgZone | 'zone.js' | 'noop';
    ngZoneEventCoalescing?: boolean;
    ngZoneRunCoalescing?: boolean;
}

export type PlatformCache = {
    platform: { [key: string]: PlatformRef }
};

function getMajor(version: string): string {
    const v = version.match(/\d+/)[0];
    if (!v) {
        throw new Error('Cound not identify major version: ' + version);
    }
    return v;
}

function getPlatformCache(): PlatformCache {
    const platformCache = window as unknown as PlatformCache;
    platformCache.platform = platformCache.platform || {};
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

    const version = options.packageJson['dependencies']['@angular/core'];
    const major = version; //getMajor(version);
    const platformCache = getPlatformCache();

    let platform = platformCache.platform[major];
    if (!platform) {
        platform = options.platformFactory();
        platformCache.platform[major] = platform; 

        if (options.production) {
            enableProdMode();
        }
    }
    return platform.bootstrapModule(module, options.compilerOptions);
}