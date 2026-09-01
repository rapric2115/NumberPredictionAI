/**
 * -----------------------------------
 * Feature Registry
 * -----------------------------------
 * Registers every Feature Provider
 * FeatureEngine doesnt know what provider exits
 * It only asks the registry
 * -----------------------------------
 */

export default class FeatureRegistry {
    /** Internal registry */
    static provider = [];

    /** Register provider.
     * 
     * @param {Object} provider
     */

    static register(provider) {
        if(!provider) {
            throw new Error(
                "Cannot register null provider"
            );
        }

        if (typeof provider.extract !== "function") {
            throw new Error (`${provider.name} must implement extract(context).`);
        }

        this.providers.push(provider);
    }

    /** Returns every registered provider. */

    static getProviders() {
        return [...this.providers];
    }

    /** Remove everything */
    static clear() {
        this.providers.length = 0;
    }

    /** Returns provider name */

    static names() {
        return this.providers.map(
            provider => provider.name
        );
    }

    /** Returns total providers  */
    static count() {
        return this.providers.length;
    }
}