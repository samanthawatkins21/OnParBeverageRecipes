"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);

    const existingScript = document.querySelector('script[data-dashboard-script="true"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.type = "module";
    script.src = `/dashboard.js?v=${Date.now()}`;
    script.dataset.dashboardScript = "true";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  if (!isReady) {
    return (
      <div className="shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">Batch cocktail costing</p>
            <h1>Cocktail Recipe Dashboard</h1>
          </div>
        </header>
        <main>
          <section className="panel is-active">
            <div className="empty-state">Loading dashboard...</div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Batch cocktail costing</p>
          <h1>Cocktail Recipe Dashboard</h1>
        </div>
        <div className="top-actions" aria-label="Dashboard controls">
          <button className="tab-button is-active" data-tab="recipes" type="button">Recipes</button>
          <button className="tab-button" data-tab="pricing" type="button">Tap Wall Pricing</button>
          <button className="tab-button" data-tab="ingredients" type="button">Cocktail Ingredients</button>
          <button className="tab-button" data-tab="inventory" type="button">Inventory</button>
          <button className="tab-button" data-tab="add" type="button">Add Recipe</button>
          <button className="tab-button" data-tab="old" type="button">Old Recipes</button>
        </div>
      </header>

      <main>
        <section className="panel is-active" id="recipes-panel" aria-labelledby="recipes-tab">
          <div className="toolbar">
            <label className="search-field">
              <span>Search recipes or ingredients</span>
              <input id="recipe-search" type="search" placeholder="Search cocktails, liquor, juice..." />
            </label>
            <label className="select-field">
              <span>Spirit</span>
              <select id="category-filter">
                <option value="all">All spirits</option>
              </select>
            </label>
          </div>

          <div className="stats-grid" id="stats-grid"></div>
          <div className="recipe-grid" id="recipe-grid"></div>
        </section>

        <section className="panel" id="pricing-panel" aria-labelledby="pricing-tab">
          <div className="toolbar">
            <label className="search-field">
              <span>Find recipe</span>
              <input id="pricing-search" type="search" placeholder="Search charge pricing..." />
            </label>
            <button className="ghost-button" id="clear-charges" type="button">Clear charge overrides</button>
          </div>

          <div className="pricing-layout">
            <aside className="pricing-summary" id="pricing-summary"></aside>
            <div className="pricing-table-wrap">
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Recipe</th>
                    <th>Cost / oz</th>
                    <th>Charge / oz</th>
                    <th>Profit / oz</th>
                    <th>Margin</th>
                    <th>Oz for 1.5 alcohol</th>
                    <th>Charge / pour</th>
                  </tr>
                </thead>
                <tbody id="pricing-table"></tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="panel" id="add-panel" aria-labelledby="add-tab">
          <form className="recipe-form" id="recipe-form">
            <div className="form-header">
              <div>
                <p className="eyebrow">Recipe builder</p>
                <h2 id="recipe-form-title">Add a new cocktail</h2>
              </div>
              <div className="form-actions">
                <button className="ghost-button" id="cancel-edit" type="button" hidden>Cancel edit</button>
                <button className="primary-button" id="recipe-submit-button" type="submit">Add recipe</button>
              </div>
            </div>

            <div className="form-grid">
              <label>
                <span>Recipe name</span>
                <input id="new-recipe-title" type="text" required placeholder="Example: Spicy Pineapple Margarita" />
              </label>
              <label>
                <span>Spirit</span>
                <select id="new-recipe-category">
                  <option>Vodka</option>
                  <option>Tequila</option>
                  <option>Whiskey</option>
                  <option>Gin</option>
                  <option>Rum</option>
                  <option>Other</option>
                </select>
              </label>
              <label>
                <span>Charge per oz</span>
                <input id="new-recipe-charge" type="text" inputMode="decimal" placeholder="2.49" />
              </label>
            </div>

            <div className="builder-panel">
              <div className="builder-panel__header">
                <h3>Ingredients</h3>
                <button className="ghost-button" id="add-ingredient-row" type="button">Add ingredient</button>
              </div>
              <p className="formula-note">Put the liquor as the first ingredient. The dashboard uses that first row to calculate how many ounces of cocktail equal 1.5 oz of alcohol.</p>
              <div className="new-ingredient-table-wrap">
                <table className="new-ingredient-table">
                  <thead>
                    <tr>
                      <th>Ingredient</th>
                      <th>Bottles / gallons</th>
                      <th>Oz in recipe</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="new-ingredient-rows"></tbody>
                </table>
              </div>
            </div>
          </form>
        </section>

        <section className="panel" id="ingredients-panel" aria-labelledby="ingredients-tab">
          <div className="toolbar">
            <label className="search-field">
              <span>Find ingredient</span>
              <input id="ingredient-search" type="search" placeholder="Search ingredient catalog..." />
            </label>
            <button className="ghost-button" id="clear-prices" type="button">Clear bottle overrides</button>
          </div>

          <div className="ingredient-layout">
            <aside className="ingredient-summary" id="ingredient-summary"></aside>
            <div className="ingredient-table-wrap">
              <table className="ingredient-table">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Current $/oz</th>
                    <th>Bottle oz</th>
                    <th>Bottle price</th>
                    <th>Last updated</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody id="ingredient-table"></tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="panel" id="inventory-panel" aria-labelledby="inventory-tab">
          <div className="toolbar">
            <label className="search-field">
              <span>Find inventory item</span>
              <input id="inventory-search" type="search" placeholder="Search liquor, mixers, reorder items..." />
            </label>
          </div>

          <div className="inventory-layout">
            <aside className="inventory-summary" id="inventory-summary"></aside>
            <div className="inventory-sections">
              <section className="inventory-block">
                <div className="inventory-block__header">
                  <div>
                    <p className="eyebrow">Snapshot</p>
                    <h2>Current Inventory</h2>
                  </div>
                </div>
                <div className="inventory-table-wrap">
                  <table className="inventory-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>On hand</th>
                        <th>Par</th>
                        <th>Order</th>
                        <th>Unit cost</th>
                        <th>Total value</th>
                      </tr>
                    </thead>
                    <tbody id="inventory-table"></tbody>
                  </table>
                </div>
              </section>

              <section className="inventory-block">
                <div className="inventory-block__header">
                  <div>
                    <p className="eyebrow">Reorder List</p>
                    <h2>Needs To Be Ordered</h2>
                    <p className="formula-note inventory-note">Liquor orders stay in bottles. Mixer Cabinet orders round up to full cases of 12.</p>
                  </div>
                </div>
                <div className="inventory-table-wrap">
                  <table className="inventory-table inventory-table--orders">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>On hand</th>
                        <th>Par</th>
                        <th>Order (liquor bottles, mixer cases of 12)</th>
                        <th>Unit cost</th>
                        <th>Est. reorder cost</th>
                      </tr>
                    </thead>
                    <tbody id="inventory-order-table"></tbody>
                  </table>
                </div>
              </section>

              <section className="inventory-block">
                <div className="inventory-block__header">
                  <div>
                    <p className="eyebrow">Weekly History</p>
                    <h2>Saved Inventory Snapshots</h2>
                  </div>
                </div>
                <div className="inventory-history-list" id="inventory-history-list"></div>
              </section>
            </div>
          </div>
        </section>

        <section className="panel" id="old-panel" aria-labelledby="old-tab">
          <div className="toolbar">
            <label className="search-field">
              <span>Search old recipes</span>
              <input id="old-search" type="search" placeholder="Search deactivated cocktails..." />
            </label>
          </div>
          <div className="recipe-grid" id="old-recipe-grid"></div>
        </section>
      </main>

      <template
        id="recipe-card-template"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `
            <article class="recipe-card">
              <div class="recipe-card__header">
                <div>
                  <p class="recipe-card__batch"></p>
                  <h2></h2>
                </div>
                <span class="spirit-pill"></span>
              </div>
              <div class="recipe-card__actions"></div>
              <div class="recipe-card__numbers"></div>
              <div class="recipe-table-wrap">
                <table class="recipe-table">
                  <thead>
                    <tr>
                      <th>Recipe</th>
                      <th>$</th>
                      <th>Oz</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </article>
          `,
        }}
      />
    </div>
  );
}
