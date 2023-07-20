///////////////////////////////////////////////////
// hot reload
if (module.hot) module.hot.accept();
/////////////////////////////////////////////////////
const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
// prettier-ignore
const getRecipe = async function() {
    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
        if (!res.ok) throw new Error(``);
        console.log(res);
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
getRecipe();

//# sourceMappingURL=index.62406edb.js.map
