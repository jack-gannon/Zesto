import React, { useState, useEffect } from "react";
import ControlPanel from "../Components/ControlPanel";
import Tabs from "../Components/Tabs";
import Loader from "../Components/Loader";
import Ingredients from "../Components/Ingredients";
import Directions from "../Components/Directions";
import { Link } from "@reach/router";

const Recipe = props => {
  const [isBookmarked, setBookmark] = useState(false);
  const [recipeData, setRecipeData] = useState("");
  const [isLoading, setLoadState] = useState(true);
  const [active, setActive] = useState("Ingredients"); //For mobile tabs

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.id}`)
      .then(response => response.json())
      .then(data => setRecipeData(data.meals[0]))
      .then(() => setLoadState(false))
      .catch(error => console.log(error));
    props.bookmarks[props.id] ? setBookmark(true) : setBookmark(false);
  }, [props.bookmarks, props.id]);

  function IngredientObject(ingredient, unit) {
    this.ingredient = ingredient;
    this.unit = unit;
    this.isChecked = false;
  }

  let gatherIngredients = dataObj => {
    let arr = [];
    for (let i = 1; i < 20; i++) {
      let ing = `strIngredient${i}`;
      let unit = `strMeasure${i}`;
      arr.push(new IngredientObject(dataObj[ing], dataObj[unit]));
    }
    return arr.filter(item => item.ingredient); //remove empty items
  };

  let ingredients = gatherIngredients(recipeData);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="recipe-container">
            <nav className="recipe__breadcrumb">
              <Link to="/">Home</Link>/<Link to="/results">Search Results</Link>
              /<p> {recipeData.strMeal}</p>
            </nav>
            <nav className="recipe__back-mobile">
              <Link to="/results" className="recipe__back-btn">
                Back
              </Link>
            </nav>
          </div>
          <article className="recipe-container">
            <header className="recipe-header">
              <img
                src={recipeData.strMealThumb}
                alt={recipeData.strMeal}
                className="recipe-header__img"
              />
              <div className="recipe-header__details">
                <h1 className="recipe-header__title">{recipeData.strMeal}</h1>
                <p className="recipe-header__info">
                  {recipeData.strCategory} • {recipeData.strArea}
                </p>
                <ControlPanel
                  removeBookmark={() => (
                    props.removeBookmark(recipeData.idMeal), setBookmark(false)
                  )}
                  addBookmark={() =>
                    props.addBookmark({
                      name: recipeData.strMeal,
                      id: recipeData.idMeal,
                      img: recipeData.strMealThumb
                    })
                  }
                  isBookmarked={isBookmarked}
                  videoLink={recipeData.strYoutube}
                />
              </div>
            </header>
            <main className="recipe-main">
              <section className="recipe-instructions">
                <div className="recipe-instructions-mobile">
                  <Tabs
                    items={["Ingredients", "Directions"]}
                    action={setActive}
                    active={active}
                  />
                  {active === "Ingredients" ? (
                    <Ingredients
                      ingredients={ingredients}
                      listItems={props.listItems}
                      addListItem={props.addListItem}
                      removeListItem={props.removeListItem}
                    />
                  ) : (
                    <Directions
                      directions={recipeData.strInstructions.split(/\r\n/g)}
                    />
                  )}
                </div>
                <div className="recipe-instructions-desktop">
                  <Ingredients
                    ingredients={ingredients}
                    listItems={props.listItems}
                    addListItem={props.addListItem}
                    removeListItem={props.removeListItem}
                  />
                  <Directions
                    directions={recipeData.strInstructions.split(/\r\n/g)}
                  />
                </div>
              </section>
              <section className="recipe-tags">
                <h3 className="instruction__header">Tags</h3>
                {recipeData.strTags
                  ? recipeData.strTags.split(",").map((tag, index) => (
                      <p key={index} className="recipe__tag">
                        {tag}
                      </p>
                    ))
                  : "No tags"}
              </section>
            </main>
          </article>
        </>
      )}
    </>
  );
};

export default Recipe;
