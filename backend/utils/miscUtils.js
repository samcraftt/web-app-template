// Small, miscellaneous helper functions

// Convert an object's properties from snake_case to camelCase
const toCamelCase = (snakeCaseObject) => {
    if (snakeCaseObject) {
        const camelCaseObject = {};
        for (const snakeCaseProp in snakeCaseObject) {
          const camelCaseProp = snakeCaseProp.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
          camelCaseObject[camelCaseProp] = snakeCaseObject[snakeCaseProp];
        }
        return camelCaseObject;
    }
};

module.exports = {
    toCamelCase
};
