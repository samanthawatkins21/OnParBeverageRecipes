const CSV_PATH = "./data/cocktail-recipes.csv";
const NEW_COCKTAILS_CSV_PATH = "./data/new-cocktails.csv";
const INVENTORY_CSV_PATH = "./data/inventory-2026-06-01.csv";
const KEG_LEVELS_CSV_PATH = "./data/keg-levels-template.csv";
const WEEKLY_USAGE_CSV_PATH = "./data/weekly-usage-history.csv";
const STORAGE_KEY = "cocktail-dashboard-ingredient-prices";
const CHARGE_STORAGE_KEY = "cocktail-dashboard-charge-prices";
const CUSTOM_RECIPE_STORAGE_KEY = "cocktail-dashboard-custom-recipes";
const INACTIVE_RECIPE_STORAGE_KEY = "cocktail-dashboard-inactive-recipes";
const EDITED_RECIPE_STORAGE_KEY = "cocktail-dashboard-edited-recipes";
const INVENTORY_ON_HAND_STORAGE_KEY = "cocktail-dashboard-inventory-on-hand";
const INVENTORY_PAR_STORAGE_KEY = "cocktail-dashboard-inventory-par";
const INVENTORY_HISTORY_STORAGE_KEY = "cocktail-dashboard-inventory-history";
const KEG_ON_HAND_STORAGE_KEY = "cocktail-dashboard-keg-on-hand";
const KEG_PAR_STORAGE_KEY = "cocktail-dashboard-keg-par";
const KEG_PRICE_STORAGE_KEY = "cocktail-dashboard-keg-prices";
const WEEKLY_USAGE_CURRENT_STORAGE_KEY = "cocktail-dashboard-weekly-usage-current";
const WEEKLY_USAGE_HISTORY_STORAGE_KEY = "cocktail-dashboard-weekly-usage-history";
const KEG_VENDOR_MAPPINGS = {
  "michelob-ultra": "Heidelberg",
  "busch-light": "Heidelberg",
  "bud-light": "Heidelberg",
  "cincy-light": "Heidelberg",
  "summer-ale": "Heidelberg",
  "kona-big-wave": "Heidelberg",
  truth: "Heidelberg",
  "stella-artois": "Heidelberg",
  "angry-orchard": "Heidelberg",
  "truly-wild-berry": "Heidelberg",
  "goose-ipa": "Heidelberg",
  budweiser: "Heidelberg",
  "triple-jam-cider": "Heidelberg",
  yuengling: "Heidelberg",
  octoberfest: "Heidelberg",
  "miller-lite": "Bonbright",
  "pabst-blue-ribbon": "Bonbright",
  "coors-light": "Bonbright",
  "blue-moon": "Bonbright",
  modelo: "Bonbright",
  "astra-red-cream-soda": "Bonbright",
  "voodoo-ranger-juicy-haze": "Bonbright",
  "two-hearted-ipa": "Bonbright",
  "dortmunder-gold-lager": "Bonbright",
  "garage-beer-lime": "Bonbright",
  corona: "Bonbright",
  "breakfast-stout": "Bonbright",
  "garage-beer": "Bonbright",
  guinness: "Bonbright",
  "voodoo-ranger-ipa": "Bonbright",
};
const INVENTORY_CABINET_ORDER = [
  "Bulleit Bourbon",
  "Crown Royal",
  "Svedka Blue Raspberry Vodka",
  "Jose Cuervo Silver",
  "Tito's",
  "Ketel One Cucumber Vodka",
  "Absolut Citron",
  "Crown Apple",
  "Captain Morgan",
  "Bombay Sapphire",
  "Jack Daniel's",
  "Blue Rasp Powder",
  "Bitters",
  "Lemon Juice",
  "Raspberry Schnapps",
  "Pomegranate Schnapps",
  "Strawberry Schnapps",
  "Triple Sec",
  "Peach Schnapps",
  "Blueberry Schnapps",
  "Lime Juice",
  "Watermelon Schnapps",
  "Apple Schnapps",
  "Creme de Cacao",
  "Kahlua",
  "Cold Brew",
  "Sour Mix",
];
const DEFAULT_BATCH_LABEL = "12 gallon keg";
const PROOF_MAPPINGS = {
  "apple-pucker": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Sour Apple Schnapps Pucker 30 1L", bottleOz: 33.81, searchAliases: ["Apple Pucker", "Pucker Sour Apple", "DeKuyper Pucker Sour Apple Schnapps"] },
  "apple-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "Llord's Apple Schnapps 1L", bottleOz: 33.81 },
  bitters: { vendor: "Proof", syncVendor: "Provi", productName: "Angostura Bitters Aromatic 16oz", bottleOz: 16 },
  "blueberry-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Blueberry Schnapps 30 1L", bottleOz: 33.81, searchAliases: ["Blueberry Schnapps", "DeKuyper Blueberry Schnapps"] },
  "creme-de-cacao": { vendor: "Proof", syncVendor: "Provi", productName: "Llords Creme De Cacao 30 1L", bottleOz: 33.81, searchAliases: ["Llord's Creme De Cacao White", "Creme De Cacao White"] },
  "lemon-juice": { vendor: "Proof", syncVendor: "Provi", productName: "Finest Call Single Pressed Lemon Juice 1L", bottleOz: 33.81 },
  "lime-juice": { vendor: "Proof", syncVendor: "Provi", productName: "Finest Call Lime Juice 1L", bottleOz: 33.81 },
  mint: { vendor: "Proof", syncVendor: "Provi", productName: "Master of Mixes Cocktail Mixer - Other Mint Syrup Cocktail Essentials 375mL", bottleOz: 12.68, searchAliases: ["Master of Mixes Mint Syrup", "Mint Syrup"] },
  "peach-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Peach Schnapps Peachtree 30 1L", bottleOz: 33.81, searchAliases: ["Peachtree", "DeKuyper Peachtree Schnapps"] },
  "pomegranate-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Pomegranate Schnapps Pomegranate Pleasure 30 1L", bottleOz: 33.81, searchAliases: ["Pomegranate Schnapps", "DeKuyper Pomegranate Schnapps"] },
  "raspberry-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Raspberry Schnapps 33 1L", bottleOz: 33.81, searchAliases: ["DeKuyper Razzmatazz Schnapps", "Razzmatazz"] },
  "strawberry-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Sour Strawberry Schnapps Pucker 30 1L", bottleOz: 33.81, searchAliases: ["Strawberry Pucker", "DeKuyper Pucker Strawberry Schnapps"] },
  "triple-sec": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Triple Sec 30 1L", bottleOz: 33.81 },
  "watermelon-schnapps": { vendor: "Proof", syncVendor: "Provi", productName: "DeKuyper Sour Watermelon Schnapps Pucker 30 1L", bottleOz: 33.81, searchAliases: ["Watermelon Pucker", "DeKuyper Pucker Watermelon Schnapps"] },
};
const OHLQ_MAPPINGS = {
  "absolut-citron": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Absolut Citron Vodka 1.75L", bottleOz: 59.17 },
  "bombay-sapphire": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Bombay Sapphire Gin 1.75L", bottleOz: 59.17 },
  "bulleit-bourbon": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Bulleit Bourbon 1.75L", bottleOz: 59.17 },
  "captain-morgan": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Captain Morgan Original Spiced Rum 1.75L", bottleOz: 59.17 },
  "crown-apple": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Crown Royal Regal Apple 1.75L", bottleOz: 59.17 },
  "crown-royal": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Crown Royal Canadian Whisky 1.75L", bottleOz: 59.17 },
  "jack-daniel-s": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Jack Daniel's Old No. 7 1.75L", bottleOz: 59.17 },
  "jack-daniel-s-fire": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Jack Daniel's Tennessee Fire 1.75L", bottleOz: 59.17 },
  "jim-beam": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Jim Beam Bourbon 1.75L", bottleOz: 59.17 },
  "jose-cuervo-silver": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Jose Cuervo Especial Silver 1.75L", bottleOz: 59.17 },
  kahlua: { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Kahlua Coffee Liqueur 1L", bottleOz: 33.81 },
  "ketel-one-cucumber-vodka": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Ketel One Botanical Cucumber & Mint 1L", bottleOz: 33.81 },
  "svedka-blue-raspberry-vodka": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Svedka Blue Raspberry Vodka 750mL", bottleOz: 25.36 },
  "tito-s": { vendor: "OHLQ", syncVendor: "OHLQ", productName: "Tito's Handmade Vodka 1.75L", bottleOz: 59.17 },
};
const INGREDIENT_ABV_PERCENT = {
  "absolut-citron": 40,
  "apple-pucker": 15,
  "apple-schnapps": 15,
  bitters: 44.7,
  "blueberry-schnapps": 15,
  "bombay-sapphire": 47,
  "bulleit-bourbon": 45,
  "captain-morgan": 35,
  "creme-de-cacao": 15,
  "crown-apple": 35,
  "crown-royal": 40,
  "jack-daniel-s": 40,
  "jack-daniel-s-fire": 35,
  "jim-beam": 40,
  "jose-cuervo-silver": 40,
  kahlua: 20,
  "ketel-one-cucumber-vodka": 30,
  "peach-schnapps": 15,
  "pomegranate-schnapps": 15,
  "raspberry-schnapps": 16.5,
  "strawberry-schnapps": 15,
  "svedka-blue-raspberry-vodka": 35,
  "tito-s": 40,
  "triple-sec": 15,
  "watermelon-schnapps": 15,
};
const MENU_ORDER = [
  ["GIN & JUICE (BOMBAY)", "Ginny from the Block (Gin)"],
  ["CAPTAIN QUENCHER (CAPTAIN MORGAN)", "Captain Quencher (Rum)"],
  ["BLUEBERRY MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["HOUSE MARGARITA (JOSE CUERVO)", "House Margarita (Tequilla)"],
  ["PEACH MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["RASPBERRY MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["STRAWBERRY MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["WATERMELON MARGARITA (JOSE CUERVO)", "Strawberry/Watermelon/Peach/Blueberry Marg (Tequilla)"],
  ["STRAWBERRY SENORITA (JOSE CUERVO)", "Strawberry Senorita (Tequilla)"],
  ["APPLETINI (TITO'S)", "Apple-tini(Vodka)"],
  ["BLUE DOT (SVEDKA)", "Blue Dot (Vodka)"],
  ["BOOZY CUCUMBER LEMONADE (KETEL ONE)", "Boozy Cucumber Lemonade (Vodka)"],
  ["ESPRESSO MARTINI (TITO'S)", "Espresso Martini"],
  ["LEMON DROP MARTINI (ABSOLUT CITRON)", "Lemon Drop Martini(Vodka)"],
  ["POMEGRANATE MARTINI (TITO'S)", "Pomegranate Martini(Tito's)"],
  ["SPIKED ARNOLD PALMER (TITO'S)", "Spiked Arnold Palmer (Vodka)"],
  ["SPIKED CRANBERRY LEMONADE (TITO'S)", "Spiked Cranberry Lemonade (Vodka)"],
  ["SPIKED PINK LEMONADE (TITO'S)", "Spiked Strawberry Lemonade (Vodka)"],
  ["SPIKED STRAWBERRY LEMONADE (TITO'S)", "Spiked Strawberry Lemonade (Vodka)"],
  ["VODKA CRAN (TITO'S)", "Vodka Cran(Vodka)"],
  ["CROWN APPLE 'RITA", "Crown Apple 'rita(Whiskey)"],
  ["JACKED UP STRAWBERRY LEMONADE (JACK DANIELS)", "Jacked Up Strawberry Lemonade (Whiskey)"],
  ["OLD FASHIONED (BULLEIT)", "Old fashioned (Whiskey)"],
  ["JACK & LEMONADE", "Jack and Lemonade (Whiskey)"],
  ["WASHINGTON APPLE (CROWN ROYAL APPLE)", "Washington Apple (Whiskey)"],
  ["WHISKEY SOUR (JACK DANIELS)", "Whiskey Sour (Whiskey)"],
];
const NEW_RECIPE_ORDER = [
  ["WHISKEY SMASH", "Whiskey Smash"],
  ["APPLE JACK (WHISKEY)", "Apple Jack (Whiskey)"],
  ["ON PAR TEE", "On Par Tee"],
];
const recipeGrid = document.querySelector("#recipe-grid");
const oldRecipeGrid = document.querySelector("#old-recipe-grid");
const statsGrid = document.querySelector("#stats-grid");
const categoryFilter = document.querySelector("#category-filter");
const recipeSearch = document.querySelector("#recipe-search");
const oldSearch = document.querySelector("#old-search");
const pricingSearch = document.querySelector("#pricing-search");
const pricingTable = document.querySelector("#pricing-table");
const pricingSummary = document.querySelector("#pricing-summary");
const ingredientSearch = document.querySelector("#ingredient-search");
const ingredientTable = document.querySelector("#ingredient-table");
const kegPricingTable = document.querySelector("#keg-pricing-table");
const ingredientSummary = document.querySelector("#ingredient-summary");
const inventorySearch = document.querySelector("#inventory-search");
const inventoryTable = document.querySelector("#inventory-table");
const inventoryOrderTable = document.querySelector("#inventory-order-table");
const inventorySummary = document.querySelector("#inventory-summary");
const inventoryHistoryList = document.querySelector("#inventory-history-list");
const kegSummary = document.querySelector("#keg-summary");
const kegWalls = document.querySelector("#keg-walls");
const weeklyUsageSearch = document.querySelector("#weekly-usage-search");
const weeklyUsageHead = document.querySelector("#weekly-usage-head");
const weeklyUsageSaveButton = document.querySelector("#save-weekly-usage");
const weeklyUsageToggleButton = document.querySelector("#toggle-weekly-usage-history");
const weeklyUsageSummary = document.querySelector("#weekly-usage-summary");
const weeklyUsageTable = document.querySelector("#weekly-usage-table");
const clearPricesButton = document.querySelector("#clear-prices");
const clearKegPricesButton = document.querySelector("#clear-keg-prices");
const clearChargesButton = document.querySelector("#clear-charges");
const recipeForm = document.querySelector("#recipe-form");
const recipeFormTitle = document.querySelector("#recipe-form-title");
const recipeSubmitButton = document.querySelector("#recipe-submit-button");
const cancelEditButton = document.querySelector("#cancel-edit");
const addIngredientRowButton = document.querySelector("#add-ingredient-row");
const newIngredientRows = document.querySelector("#new-ingredient-rows");
const cardTemplate = document.querySelector("#recipe-card-template");

let recipes = [];
let ingredients = [];
let inventoryItems = [];
let kegWallItems = [];
let weeklyUsageItems = [];
let weeklyUsageShowMore = false;
let weeklyUsageCurrentOverrides = loadWeeklyUsageCurrentOverrides();
let weeklyUsageHistoryOverrides = loadWeeklyUsageHistoryOverrides();
let kegPricingItems = [];
let priceOverrides = loadOverrides();
let kegPriceOverrides = loadKegPriceOverrides();
let chargeOverrides = loadChargeOverrides();
let customRecipes = loadCustomRecipes();
let inactiveRecipeIds = loadInactiveRecipeIds();
let editedRecipes = loadEditedRecipes();
let inventoryOnHandOverrides = loadInventoryOnHandOverrides();
let inventoryParOverrides = loadInventoryParOverrides();
let inventoryHistory = loadInventoryHistory();
let kegOnHandOverrides = loadKegOnHandOverrides();
let kegParOverrides = loadKegParOverrides();
let inventoryParEditState = {};
let editingRecipeId = null;
let vendorSyncScope = "all";
let vendorSyncMessage = "Press sync to check mapped vendors automatically. Vendors without a supported connection will report what is still needed.";
let vendorSyncRunning = false;
let kegLiveLevels = new Map();
let kegSyncMessage = "Refresh keg levels to pull current percentages from Pour My Beer.";
let kegSyncLoading = false;
let kegUpdatedAt = "";
let kegConfigUpdateRunning = false;
let kegDeviceLevels = new Map();
let kegTemplateAssignments = new Map();

init();

async function init() {
  const [csv, newCocktailsCsv, inventoryCsv, kegLevelsCsv, weeklyUsageCsv] = await Promise.all([
    fetchCsv(CSV_PATH),
    fetchCsv(NEW_COCKTAILS_CSV_PATH),
    fetchCsv(INVENTORY_CSV_PATH),
    fetchOptionalCsv(KEG_LEVELS_CSV_PATH),
    fetchOptionalCsv(WEEKLY_USAGE_CSV_PATH),
  ]);

  recipes = [
    ...applyMenuOrder(parseRecipes(parseCsv(csv))),
    ...applyRecipeOrder(parseRecipes(parseCsv(newCocktailsCsv)), NEW_RECIPE_ORDER),
    ...customRecipes,
  ].map(applyRecipeEdits);
  ingredients = buildIngredientCatalog(getActiveRecipes());
  inventoryItems = parseInventory(parseCsv(inventoryCsv));
  kegWallItems = kegLevelsCsv ? parseKegLevels(parseCsv(kegLevelsCsv)) : [];
  kegPricingItems = buildKegPricingCatalog(kegWallItems);
  weeklyUsageItems = weeklyUsageCsv ? parseWeeklyUsage(parseCsv(weeklyUsageCsv)) : [];
  hydrateCategoryFilter(recipes);
  bindEvents();
  addIngredientRow();
  addIngredientRow();
  addIngredientRow();
  render();
  runKegLevelSync();
}

function bindEvents() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });

  recipeSearch.addEventListener("input", renderRecipes);
  categoryFilter.addEventListener("change", renderRecipes);
  oldSearch.addEventListener("input", renderOldRecipes);
  pricingSearch.addEventListener("input", renderPricing);
  ingredientSearch.addEventListener("input", renderIngredients);
  inventorySearch.addEventListener("input", renderInventory);
  weeklyUsageSearch?.addEventListener("input", renderWeeklyUsage);
  weeklyUsageSaveButton?.addEventListener("click", saveWeeklyUsageHistory);
  weeklyUsageToggleButton?.addEventListener("click", () => {
    weeklyUsageShowMore = !weeklyUsageShowMore;
    renderWeeklyUsage();
  });
  recipeForm.addEventListener("submit", addCustomRecipe);
  addIngredientRowButton.addEventListener("click", addIngredientRow);
  cancelEditButton.addEventListener("click", resetRecipeForm);
  clearPricesButton.addEventListener("click", () => {
    priceOverrides = {};
    saveOverrides();
    render();
  });
  clearKegPricesButton?.addEventListener("click", () => {
    kegPriceOverrides = {};
    saveKegPriceOverrides();
    render();
  });
  clearChargesButton.addEventListener("click", () => {
    chargeOverrides = {};
    saveChargeOverrides();
    render();
  });

  document.addEventListener("keydown", handleEnterKeyNavigation);
}

function switchTab(tabName) {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabName);
  });

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `${tabName}-panel`);
  });
}

function render() {
  ingredients = buildIngredientCatalog(getActiveRecipes());
  kegPricingItems = buildKegPricingCatalog(kegWallItems);
  syncInventoryItemCatalogLinks();
  renderStats();
  renderRecipes();
  renderPricing();
  renderIngredients();
  renderInventory();
  renderKegLevels();
  renderWeeklyUsage();
  renderOldRecipes();
}

function renderStats() {
  const activeRecipes = getActiveRecipes();
  const totals = activeRecipes.map(getRecipeTotals);
  const recipeCount = activeRecipes.length;
  const totalCost = sum(totals.map((total) => total.cost));
  const totalOz = sum(totals.map((total) => total.oz));
  const avgCostPerOz = totalOz ? totalCost / totalOz : 0;
  const totalRevenue = sum(activeRecipes.map((recipe) => getRecipePricing(recipe).revenue));
  const avgMargin = totalRevenue ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0;
  const overrideCount = Object.keys(priceOverrides).filter((key) => {
    const override = priceOverrides[key];
    return toNumber(override?.bottleOz) && toNumber(override?.bottlePrice);
  }).length;

  statsGrid.innerHTML = "";
  [
    ["Recipes", recipeCount.toLocaleString()],
    ["Total batch cost", money(totalCost)],
    ["Avg cost per oz", money(avgCostPerOz)],
    ["Avg profit margin", `${formatNumber(avgMargin)}%`],
    ["Live ingredient prices", overrideCount.toLocaleString()],
  ].forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    statsGrid.append(card);
  });
}

function renderRecipes() {
  const searchTerm = recipeSearch.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const visibleRecipes = getActiveRecipes().filter((recipe) => {
    const matchesCategory = category === "all" || recipe.category === category;
    const haystack = `${recipe.title} ${recipe.batch} ${recipe.ingredients.map((item) => item.name).join(" ")}`.toLowerCase();
    return matchesCategory && haystack.includes(searchTerm);
  });

  recipeGrid.innerHTML = "";

  visibleRecipes.forEach((recipe) => {
    const card = createRecipeCard(recipe, "active");
    recipeGrid.append(card);
  });
}

function renderOldRecipes() {
  const searchTerm = oldSearch.value.trim().toLowerCase();
  const oldRecipes = getInactiveRecipes().filter((recipe) => {
    const haystack = `${recipe.title} ${recipe.batch} ${recipe.ingredients.map((item) => item.name).join(" ")}`.toLowerCase();
    return haystack.includes(searchTerm);
  });

  oldRecipeGrid.innerHTML = "";
  if (!oldRecipes.length) {
    oldRecipeGrid.innerHTML = `<div class="empty-state">No old recipes yet.</div>`;
    return;
  }

  oldRecipes.forEach((recipe) => {
    oldRecipeGrid.append(createRecipeCard(recipe, "inactive"));
  });
}

function createRecipeCard(recipe, state) {
  const totals = getRecipeTotals(recipe);
  const pricing = getRecipePricing(recipe);
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  card.querySelector("h2").textContent = recipe.title;
  card.querySelector(".recipe-card__batch").textContent = formatBatchLabel(recipe.batch);
  card.querySelector(".spirit-pill").textContent = recipe.category;
  const actions = card.querySelector(".recipe-card__actions");
  actions.innerHTML = `
    <button class="mini-button" data-action="edit" type="button">Edit</button>
    <button class="mini-button" data-action="toggle" type="button">${state === "active" ? "Deactivate" : "Reactivate"}</button>
    ${state === "inactive" && recipe.isCustom ? '<button class="mini-button mini-button--danger" data-action="delete" type="button">Delete custom</button>' : ""}
  `;
  actions.querySelector('[data-action="edit"]').addEventListener("click", () => startEditingRecipe(recipe.id));
  actions.querySelector('[data-action="toggle"]').addEventListener("click", () => {
    if (state === "active") {
      deactivateRecipe(recipe.id);
    } else {
      reactivateRecipe(recipe.id);
    }
  });
  const deleteButton = actions.querySelector('[data-action="delete"]');
  if (deleteButton) {
    deleteButton.addEventListener("click", () => deleteCustomRecipe(recipe.id));
  }
  card.querySelector(".recipe-card__numbers").innerHTML = [
    ["Total cost", money(totals.cost)],
    ["Total oz", formatNumber(totals.oz)],
    ["ABV", `${formatNumber(totals.abvPercent)}%`],
    ["Profit margin", `${formatNumber(pricing.margin)}%`],
  ]
    .map(([label, value]) => `<div class="recipe-number"><strong>${value}</strong><span>${label}</span></div>`)
    .join("");

  const tbody = card.querySelector("tbody");
  recipe.ingredients.forEach((ingredient) => {
    const liveCost = getIngredientCost(ingredient);
    const addAmount = getRecipeCardAddAmount(ingredient);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${escapeHtml(ingredient.name)}</strong>${addAmount ? `<span class="table-note">${escapeHtml(addAmount)}</span>` : ""}</td>
      <td class="${liveCost.source === "override" ? "updated-cost" : ""}">${money(liveCost.cost)}</td>
      <td>${formatNumber(ingredient.oz)}</td>
    `;
    tbody.append(row);
  });

  const detailMetrics = getCalculatedMetrics(recipe, totals, pricing);
  const details = document.createElement("details");
  details.className = "recipe-card__details";
  details.innerHTML = `
    <summary class="recipe-card__details-summary">Show more</summary>
    <div class="recipe-card__details-body"></div>
  `;

  const detailsBody = details.querySelector(".recipe-card__details-body");
  const metricsTableWrap = document.createElement("div");
  metricsTableWrap.className = "recipe-table-wrap recipe-table-wrap--details";
  metricsTableWrap.innerHTML = `
    <table class="recipe-table recipe-table--details">
      <tbody>
        ${detailMetrics
          .map(
            (metric) => `
              <tr class="muted">
                <td>${escapeHtml(metric.label)}</td>
                <td>${metric.value}</td>
              </tr>`,
          )
          .join("")}
      </tbody>
    </table>
  `;
  detailsBody.append(metricsTableWrap);
  card.append(details);

  return card;
}

function renderPricing() {
  const searchTerm = pricingSearch.value.trim().toLowerCase();
  const visibleRecipes = getActiveRecipes().filter((recipe) => recipe.title.toLowerCase().includes(searchTerm));

  renderPricingSummary();
  pricingTable.innerHTML = "";
  visibleRecipes.forEach((recipe) => {
    const pricing = getRecipePricing(recipe);
    const override = chargeOverrides[recipe.id];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${escapeHtml(recipe.title)}</strong></td>
      <td data-pricing-cell="cost">${money(pricing.costPerOz)}</td>
      <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override ?? "")}" placeholder="${formatNumber(recipe.defaultChargePerOz)}" aria-label="Charge per ounce for ${escapeHtml(recipe.title)}"></td>
      <td data-pricing-cell="profit">${money(pricing.profitPerOz)}</td>
      <td data-pricing-cell="margin">${formatNumber(pricing.margin)}%</td>
      <td data-pricing-cell="pour-oz">${pricing.pourOz ? formatNumber(pricing.pourOz) : "-"}</td>
      <td data-pricing-cell="pour">${pricing.pourOz ? money(pricing.chargePerPour) : "-"}</td>
    `;

    const chargeInput = row.querySelector("input");
    chargeInput.addEventListener("input", () => {
      setChargeOverride(recipe.id, chargeInput.value);
      updatePricingRow(row, recipe);
    });
    pricingTable.append(row);
  });
}

function updatePricingRow(row, recipe) {
  const pricing = getRecipePricing(recipe);
  row.querySelector('[data-pricing-cell="cost"]').textContent = money(pricing.costPerOz);
  row.querySelector('[data-pricing-cell="profit"]').textContent = money(pricing.profitPerOz);
  row.querySelector('[data-pricing-cell="margin"]').textContent = `${formatNumber(pricing.margin)}%`;
  row.querySelector('[data-pricing-cell="pour-oz"]').textContent = pricing.pourOz ? formatNumber(pricing.pourOz) : "-";
  row.querySelector('[data-pricing-cell="pour"]').textContent = pricing.pourOz ? money(pricing.chargePerPour) : "-";
}

function renderPricingSummary() {
  const activeRecipes = getActiveRecipes();
  const pricing = activeRecipes.map(getRecipePricing);
  const revenue = sum(pricing.map((item) => item.revenue));
  const cost = sum(pricing.map((item) => item.cost));
  const profit = revenue - cost;
  const margin = revenue ? (profit / revenue) * 100 : 0;

  pricingSummary.innerHTML = `
    <h2>Charge pricing</h2>
    <div class="summary-line"><span>Recipes priced</span><strong>${activeRecipes.length}</strong></div>
    <div class="summary-line"><span>Charge overrides</span><strong>${countChargeOverrides()}</strong></div>
    <div class="summary-line"><span>Projected batch revenue</span><strong>${money(revenue)}</strong></div>
    <div class="summary-line"><span>Projected batch profit</span><strong>${money(profit)}</strong></div>
    <div class="summary-line"><span>Projected margin</span><strong>${formatNumber(margin)}%</strong></div>
  `;
}

function renderIngredients() {
  const searchTerm = ingredientSearch.value.trim().toLowerCase();
  const visibleIngredients = ingredients.filter((ingredient) => {
    if (ingredient.id === "water") return false;
    const haystack = `${ingredient.name} ${ingredient.recipes.join(" ")}`.toLowerCase();
    return haystack.includes(searchTerm);
  });
  const visibleKegs = kegPricingItems.filter((item) => {
    const haystack = `${item.name} ${item.type} ${item.wall} ${item.tapNumber} ${item.vendor}`.toLowerCase();
    return haystack.includes(searchTerm);
  });
  const groupedIngredients = groupIngredientsForDisplay(visibleIngredients);
  const groupedKegs = groupKegPricingItemsForDisplay(visibleKegs);

  renderIngredientSummary(visibleIngredients, visibleKegs);
  ingredientTable.innerHTML = "";
  if (kegPricingTable) kegPricingTable.innerHTML = "";

  groupedIngredients.forEach(([groupName, items]) => {
    const groupRow = document.createElement("tr");
    groupRow.className = "ingredient-group-row";
    groupRow.innerHTML = `<td colspan="6">${escapeHtml(groupName)}</td>`;
    ingredientTable.append(groupRow);

    items.forEach((ingredient) => {
      const override = priceOverrides[ingredient.id] || {};
      const currentUnitCost = getCatalogUnitCost(ingredient);
      const mappedBottleOz = ingredient.vendorProduct?.bottleOz ? formatNumber(ingredient.vendorProduct.bottleOz) : "";
      const previousPriceNote = getPreviousPriceNote(override);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <strong>${escapeHtml(ingredient.name)}</strong>
          ${ingredient.vendorProduct ? `<span class="table-note table-note--accent">${escapeHtml(ingredient.vendorProduct.vendor)} mapped</span><span class="table-note">${escapeHtml(ingredient.vendorProduct.productName)}</span>` : ""}
        </td>
        <td>${money(currentUnitCost)}</td>
        <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override.bottleOz ?? "")}" placeholder="${escapeHtml(mappedBottleOz)}" aria-label="Bottle ounces for ${escapeHtml(ingredient.name)}"></td>
        <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override.bottlePrice ?? "")}" aria-label="Bottle price for ${escapeHtml(ingredient.name)}"></td>
        <td class="muted">${formatUpdatedAt(override.updatedAt)}${previousPriceNote ? `<span class="table-note">${escapeHtml(previousPriceNote)}</span>` : ""}</td>
        <td><button class="mini-button" type="button">Update</button></td>
      `;

      const [bottleOzInput, bottlePriceInput] = row.querySelectorAll("input");
      const updateButton = row.querySelector("button");
      updateButton.addEventListener("click", () => saveIngredientOverride(ingredient.id, bottleOzInput.value, bottlePriceInput.value));
      ingredientTable.append(row);
    });
  });

  groupedKegs.forEach(([vendorName, items]) => {
    const groupRow = document.createElement("tr");
    groupRow.className = "ingredient-group-row";
    groupRow.innerHTML = `<td colspan="7">${escapeHtml(vendorName)}</td>`;
    kegPricingTable?.append(groupRow);

    items.forEach((item) => {
      const override = kegPriceOverrides[item.id] || {};
      const currentUnitCost = getKegCatalogUnitCost(item);
      const previousPriceNote = getPreviousPriceNote(override);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <strong>${escapeHtml(item.name)}</strong>
          <span class="table-note table-note--accent">${escapeHtml(item.tapSummary)}</span>
          <span class="table-note">${escapeHtml(item.typeSummary)}</span>
        </td>
        <td>${vendorName === "Needs mapping" ? `<span class="table-note">${escapeHtml(vendorName)}</span>` : escapeHtml(vendorName)}</td>
        <td>${money(currentUnitCost)}</td>
        <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override.kegOz ?? "")}" placeholder="${escapeHtml(formatNumber(item.kegOz))}" aria-label="Keg ounces for ${escapeHtml(item.name)}"></td>
        <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override.kegPrice ?? "")}" aria-label="Keg price for ${escapeHtml(item.name)}"></td>
        <td class="muted">${formatUpdatedAt(override.updatedAt)}${previousPriceNote ? `<span class="table-note">${escapeHtml(previousPriceNote)}</span>` : ""}</td>
        <td><button class="mini-button" type="button">Update</button></td>
      `;

      const [kegOzInput, kegPriceInput] = row.querySelectorAll("input");
      const updateButton = row.querySelector("button");
      updateButton.addEventListener("click", () => saveKegPriceOverride(item.id, kegOzInput.value, kegPriceInput.value));
      kegPricingTable?.append(row);
    });
  });
}

function renderIngredientSummary(visibleIngredientsInput = ingredients.filter((ingredient) => ingredient.id !== "water"), visibleKegsInput = kegPricingItems) {
  const visibleIngredients = visibleIngredientsInput.filter((ingredient) => ingredient.id !== "water");
  const visibleKegs = visibleKegsInput;
  const proofCount = countVendorMappingsByName(visibleIngredients, "Proof");
  const ohlqCount = countVendorMappingsByName(visibleIngredients, "OHLQ");
  const kegOverrides = countKegPriceOverrides();
  const kegTrackedValue = sum(visibleKegs.map((item) => getKegPrice(item)));

  ingredientSummary.innerHTML = `
    <h2>Pricing</h2>
    <div class="summary-line"><span>Unique ingredients</span><strong>${visibleIngredients.length}</strong></div>
    <div class="summary-line"><span>With bottle overrides</span><strong>${countOverrides()}</strong></div>
    <div class="summary-line"><span>Mapped to vendors</span><strong>${countVendorMappings(visibleIngredients)}</strong></div>
    <div class="summary-line"><span>Proof mapped</span><strong>${proofCount}</strong></div>
    <div class="summary-line"><span>OHLQ mapped</span><strong>${ohlqCount}</strong></div>
    <div class="summary-line"><span>Beer kegs tracked</span><strong>${visibleKegs.length}</strong></div>
    <div class="summary-line"><span>Keg overrides</span><strong>${kegOverrides}</strong></div>
    <div class="summary-line"><span>Keg catalog value</span><strong>${money(kegTrackedValue)}</strong></div>
    <div class="summary-line"><span>Total ounces tracked</span><strong>${formatNumber(sum(visibleIngredients.map((item) => item.totalOz)))}</strong></div>
    <div class="summary-line"><span>Estimated catalog cost</span><strong>${money(sum(visibleIngredients.map((item) => getCatalogCost(item))))}</strong></div>
    <div class="sync-panel">
      <h3>Vendor Sync</h3>
      <p class="sync-copy">This button uses the server-side sync route. It will update mapped ingredients automatically when a vendor connection is available, and report what is blocked when it is not.</p>
      <label class="sync-field">
        <span>Vendor scope</span>
        <select id="vendor-sync-scope">
          <option value="all"${vendorSyncScope === "all" ? " selected" : ""}>All mapped vendors</option>
          <option value="Provi"${vendorSyncScope === "Provi" ? " selected" : ""}>Provi</option>
          <option value="OHLQ"${vendorSyncScope === "OHLQ" ? " selected" : ""}>OHLQ</option>
        </select>
      </label>
      <div class="sync-actions">
        <button class="primary-button" id="run-vendor-sync" type="button"${vendorSyncRunning ? " disabled" : ""}>${vendorSyncRunning ? "Syncing..." : "Sync Prices"}</button>
      </div>
      <p class="sync-status">${escapeHtml(vendorSyncMessage)}</p>
    </div>
  `;

  bindIngredientSummaryEvents();
}

function renderInventory() {
  const visibleItems = getVisibleInventoryItems();
  const groupedItems = groupInventoryForDisplay(visibleItems);
  const reorderItems = getInventoryReorderItems(visibleItems);

  renderInventorySummary(visibleItems, reorderItems);
  renderInventoryStockTable(groupedItems);
  renderInventoryOrderTable(reorderItems);
  renderInventoryHistory();
}

function renderKegLevels() {
  if (!kegSummary || !kegWalls) return;

  const wallNames = ["Patio", "Main", "Karaoke"];
  const totalTaps = kegWallItems.length;
  const cocktailCount = kegWallItems.filter((item) => normalizeTitle(item.type) === "cocktail").length;
  const shotCount = kegWallItems.filter((item) => normalizeTitle(item.type) === "shots").length;
  const liveCount = kegWallItems.filter((item) => getKegLiveRow(item)).length;
  const reorderCount = kegWallItems.filter((item) => getKegNeed(item) > 0).length;
  const currentInventoryValue = sum(kegWallItems.map((item) => getKegCurrentValue(item, getKegLiveRow(item))));

  kegSummary.innerHTML = `
    <h2>Keg Levels</h2>
    <div class="summary-line"><span>Total taps</span><strong>${totalTaps}</strong></div>
    <div class="summary-line"><span>Walls tracked</span><strong>${wallNames.length}</strong></div>
    <div class="summary-line"><span>Cocktail taps</span><strong>${cocktailCount}</strong></div>
    <div class="summary-line"><span>Shot lines</span><strong>${shotCount}</strong></div>
    <div class="summary-line"><span>Live levels found</span><strong>${liveCount}</strong></div>
    <div class="summary-line"><span>Kegs below par</span><strong>${reorderCount}</strong></div>
    <div class="summary-line"><span>Current line value</span><strong>${money(currentInventoryValue)}</strong></div>
    <div class="sync-panel">
      <div class="sync-actions">
        <button class="primary-button" id="refresh-keg-levels" type="button"${kegSyncLoading || kegConfigUpdateRunning ? " disabled" : ""}>${kegSyncLoading ? "Refreshing..." : "Refresh keg levels"}</button>
        <button class="ghost-button" id="send-keg-config-update" type="button"${kegSyncLoading || kegConfigUpdateRunning ? " disabled" : ""}>${kegConfigUpdateRunning ? "Sending..." : "Send config update"}</button>
      </div>
      <p class="sync-copy">Live keg levels come from the local Pour My Beer server. Straight-liquor taps show current ounces, and the rest show fill percentages. On-hand and par values are saved in this browser.</p>
      <p class="sync-status">${escapeHtml(kegSyncMessage)}${kegUpdatedAt ? ` Last updated ${escapeHtml(formatUpdatedAt(kegUpdatedAt))}.` : ""}</p>
    </div>
  `;

  kegWalls.innerHTML = wallNames
    .map((wallName) => renderKegWallBlock(wallName, kegWallItems.filter((item) => item.wall === wallName)))
    .join("");

  bindKegLevelEvents();
}

function renderWeeklyUsage() {
  if (!weeklyUsageSummary || !weeklyUsageTable || !weeklyUsageHead) return;

  const searchTerm = weeklyUsageSearch?.value.trim().toLowerCase() || "";
  const visibleItems = weeklyUsageItems.filter((item) => {
    if (!searchTerm) return true;
    const haystack = `${item.tapNumber} ${item.wall} ${item.type} ${item.name}`.toLowerCase();
    return haystack.includes(searchTerm);
  });

  const latestLabel = weeklyUsageItems[0]?.history?.[0]?.label || "Latest week";
  const trackedWeeks = visibleItems.map((item) => item.history.length).filter(Boolean);
  const shotRows = visibleItems.filter((item) => item.isLiquorShot).length;
  const kegRows = visibleItems.filter((item) => !item.isLiquorShot).length;
  const averageWeeks = trackedWeeks.length ? sum(trackedWeeks) / trackedWeeks.length : 0;
  const lastWeekLabel = weeklyUsageItems[0]?.history?.[0]?.label || "";
  const historyHeaders = weeklyUsageShowMore
    ? getWeeklyUsageHistoryHeaders(visibleItems, lastWeekLabel)
    : [];

  if (weeklyUsageToggleButton) {
    weeklyUsageToggleButton.textContent = weeklyUsageShowMore ? "Show less" : "Show more";
  }
  if (weeklyUsageSaveButton) {
    weeklyUsageSaveButton.textContent = "Save this week";
  }

  weeklyUsageSummary.innerHTML = `
    <h2>Weekly Usage</h2>
    <div class="summary-line"><span>Rows loaded</span><strong>${visibleItems.length}</strong></div>
    <div class="summary-line"><span>Shot taps</span><strong>${shotRows}</strong></div>
    <div class="summary-line"><span>Beer / cocktail taps</span><strong>${kegRows}</strong></div>
    <div class="summary-line"><span>Latest history week</span><strong>${escapeHtml(latestLabel)}</strong></div>
    <div class="summary-line"><span>Avg weeks tracked</span><strong>${trackedWeeks.length ? formatNumber(averageWeeks) : "0"}</strong></div>
    <p class="sync-copy">The current CSV is now loaded from <code>public/data/weekly-usage-history.csv</code>. Edit <strong>This week</strong>, then use <strong>Save this week</strong> to move those numbers into history and clear the editable column. Use <strong>${weeklyUsageShowMore ? "Show less" : "Show more"}</strong> to expand the older weekly columns to the right.</p>
  `;

  weeklyUsageHead.innerHTML = `
    <tr>
      <th>Tap #</th>
      <th>Item</th>
      <th>Avg</th>
      <th>This week</th>
      <th>Last week</th>
      ${historyHeaders.map((label) => `<th class="weekly-usage-week">${formatWeeklyUsageHeader(label)}</th>`).join("")}
    </tr>
  `;

  weeklyUsageTable.innerHTML = visibleItems
    .map((item) => {
      const lastWeek = item.history[0]?.value;
      const currentWeekValue = getWeeklyUsageCurrentDisplay(item);
      const historyCells = historyHeaders
        .map((label) => {
          const match = item.history.find((entry) => entry.label === label);
          return `<td class="weekly-usage-week">${escapeHtml(formatUsageDisplay(match?.value, item.displayUnit))}</td>`;
        })
        .join("");
      return `
        <tr>
          <td>${item.tapNumber || "-"}</td>
          <td><strong>${escapeHtml(item.name)}</strong></td>
          <td>${escapeHtml(formatUsageDisplay(item.average, item.displayUnit))}</td>
          <td><input class="inventory-input weekly-usage-input" data-weekly-usage-id="${escapeHtml(item.id)}" type="text" inputmode="decimal" value="${escapeHtml(currentWeekValue)}" aria-label="This week for ${escapeHtml(item.name)}"></td>
          <td>${escapeHtml(formatUsageDisplay(lastWeek, item.displayUnit))}</td>
          ${historyCells}
        </tr>
      `;
    })
    .join("") || `<tr><td colspan="${5 + historyHeaders.length}" class="empty-state">No weekly usage rows match that search.</td></tr>`;

  bindWeeklyUsageEvents();
}

function getWeeklyUsageHistoryHeaders(sourceItems, excludedLabel = "") {
  const labels = [];
  sourceItems.forEach((item) => {
    item.history.forEach((entry) => {
      if (entry.label === excludedLabel) return;
      if (!labels.includes(entry.label)) labels.push(entry.label);
    });
  });
  return labels;
}

function formatWeeklyUsageHeader(label) {
  const cleaned = clean(label).replace(/\s+/g, " ");
  const parts = cleaned.split(/\s*-\s*/);
  if (parts.length >= 2) {
    return `<span class="weekly-usage-week-label"><span>${escapeHtml(parts[0])}</span><span>${escapeHtml(parts.slice(1).join(" - "))}</span></span>`;
  }
  return `<span class="weekly-usage-week-label"><span>${escapeHtml(cleaned)}</span></span>`;
}

function bindWeeklyUsageEvents() {
  document.querySelectorAll(".weekly-usage-input").forEach((input) => {
    input.addEventListener("focus", () => input.select());
    input.addEventListener("input", () => {
      const id = input.dataset.weeklyUsageId;
      if (!id) return;
      weeklyUsageCurrentOverrides[id] = input.value;
      saveWeeklyUsageCurrentOverrides();
    });
    input.addEventListener("blur", () => {
      const id = input.dataset.weeklyUsageId;
      if (!id) return;
      const item = weeklyUsageItems.find((entry) => entry.id === id);
      const normalized = normalizeWeeklyUsageInputValue(input.value, item?.displayUnit);
      if (normalized) {
        weeklyUsageCurrentOverrides[id] = normalized;
      } else {
        delete weeklyUsageCurrentOverrides[id];
      }
      saveWeeklyUsageCurrentOverrides();
      input.value = getWeeklyUsageCurrentDisplay(item);
    });
  });
}

function getWeeklyUsageCurrentDisplay(item) {
  if (!item) return "";
  return clean(weeklyUsageCurrentOverrides[item.id] ?? item.currentDisplayValue ?? "");
}

function normalizeWeeklyUsageInputValue(value, unit) {
  const normalized = clean(value);
  if (!normalized) return "";
  const number = toNumber(normalized);
  if (!Number.isFinite(number)) return "";
  return unit === "oz" ? String(Math.round(number * 10) / 10) : String(Math.round(number * 100) / 100);
}

function saveWeeklyUsageHistory() {
  const label = buildWeeklyUsageSaveLabel();
  let savedCount = 0;

  weeklyUsageItems = weeklyUsageItems.map((item) => {
    const currentValue = toNumber(getWeeklyUsageCurrentDisplay(item));
    if (!currentValue) {
      delete weeklyUsageCurrentOverrides[item.id];
      return item;
    }

    const historyEntry = { label, value: currentValue, hasValue: true };
    const mergedHistory = [historyEntry, ...item.history];
    weeklyUsageHistoryOverrides[item.id] = mergedHistory;
    delete weeklyUsageCurrentOverrides[item.id];
    savedCount += 1;

    return {
      ...item,
      history: mergedHistory,
      average: calculateAverage(mergedHistory.map((entry) => entry.value)),
      currentDisplayValue: "",
    };
  });

  saveWeeklyUsageCurrentOverrides();
  saveWeeklyUsageHistoryOverrides();
  renderWeeklyUsage();

  if (weeklyUsageSaveButton) {
    weeklyUsageSaveButton.textContent = savedCount ? `Saved ${savedCount}` : "Nothing to save";
    setTimeout(() => {
      if (weeklyUsageSaveButton) weeklyUsageSaveButton.textContent = "Save this week";
    }, 1800);
  }
}

function buildWeeklyUsageSaveLabel() {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return `${monday.getMonth() + 1}/${monday.getDate()}/${String(monday.getFullYear()).slice(-2)} - ${sunday.getMonth() + 1}/${sunday.getDate()}/${String(sunday.getFullYear()).slice(-2)}`;
}

function renderKegWallBlock(wallName, items) {
  const belowParCount = items.filter((item) => getKegNeed(item) > 0).length;
  return `
    <section class="keg-wall-card">
      <div class="keg-wall-card__header">
        <div>
          <p class="eyebrow">Tap wall</p>
          <h2>${escapeHtml(wallName)}</h2>
        </div>
        <div class="keg-wall-card__meta">
          <strong>${items.length} taps</strong>
          <span class="keg-wall-card__badge">${belowParCount} below par</span>
        </div>
      </div>
      <div class="inventory-table-wrap">
        <table class="inventory-table keg-table">
          <thead>
            <tr>
              <th>Tap #</th>
              <th>Type</th>
              <th>Brand</th>
              <th>Current level</th>
              <th>Current value</th>
              <th>On hand kegs</th>
              <th>Par kegs</th>
              <th>Need</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map((item) => {
                const liveRow = getKegLiveRow(item);
                const onHand = getKegOnHandDisplay(item);
                const par = getKegParDisplay(item);
                const need = getKegNeed(item);
                const currentValue = getKegCurrentValue(item, liveRow);
                const rowTypeClass = getKegRowTypeClass(item);
                return `
                  <tr class="${rowTypeClass}">
                    <td>${item.tapNumber}</td>
                    <td>${escapeHtml(item.type)}</td>
                    <td><strong>${escapeHtml(item.brand)}</strong></td>
                    <td class="keg-level-cell ${getKegLevelClass(liveRow?.fillLevelPercent)}">${formatKegCurrentLevel(item, liveRow)}</td>
                    <td class="keg-value-cell">${currentValue > 0 ? money(currentValue) : '<span class="inventory-order-zero">-</span>'}</td>
                    <td><input class="inventory-input keg-input" data-keg-field="onHand" data-keg-key="${escapeHtml(getKegItemKey(item))}" type="number" min="0" step="1" inputmode="numeric" value="${escapeHtml(onHand)}" placeholder="0"></td>
                    <td><input class="inventory-input keg-input keg-input--par" data-keg-field="par" data-keg-key="${escapeHtml(getKegItemKey(item))}" type="number" min="0" step="1" inputmode="numeric" value="${escapeHtml(par)}" placeholder="0"></td>
                    <td class="keg-need-cell">${need > 0 ? `<span class="inventory-order-value">${formatNumber(need)}</span>` : `<span class="inventory-order-zero">0</span>`}</td>
                  </tr>`;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function bindKegLevelEvents() {
  document.querySelector("#refresh-keg-levels")?.addEventListener("click", () => {
    runKegLevelSync();
  });
  document.querySelector("#send-keg-config-update")?.addEventListener("click", () => {
    runKegConfigUpdate();
  });

  document.querySelectorAll(".keg-input").forEach((input) => {
    input.addEventListener("input", (event) => {
      const target = event.currentTarget;
      const key = target.dataset.kegKey;
      const field = target.dataset.kegField;
      if (!key || !field) return;

      const nextValue = target.value;
      if (field === "onHand") {
        if (nextValue) {
          kegOnHandOverrides[key] = nextValue;
        } else {
          delete kegOnHandOverrides[key];
        }
        saveKegOnHandOverrides();
      }

      if (field === "par") {
        if (nextValue) {
          kegParOverrides[key] = nextValue;
        } else {
          delete kegParOverrides[key];
        }
        saveKegParOverrides();
      }

      renderKegLevels();
    });
  });
}

function handleEnterKeyNavigation(event) {
  if (event.key !== "Enter" || event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;

  const active = event.target;
  if (!(active instanceof HTMLElement)) return;
  if (!isNavigableEditable(active)) return;

  event.preventDefault();

  const nextInTable = getNextEditableInTable(active);
  if (nextInTable) {
    focusEditable(nextInTable);
    return;
  }

  const nextGlobal = getNextEditableInScope(active);
  if (nextGlobal) {
    focusEditable(nextGlobal);
  }
}

function isNavigableEditable(element) {
  if (!element.matches("input, select, textarea")) return false;
  if (element.matches('[type="hidden"], [type="search"]')) return false;
  if (element.hasAttribute("disabled") || element.hasAttribute("readonly")) return false;
  return element.offsetParent !== null;
}

function getEditableElements(scope) {
  return [...scope.querySelectorAll('input:not([type="hidden"]):not([type="search"]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]):not([readonly])')]
    .filter((element) => element.offsetParent !== null);
}

function getNextEditableInTable(active) {
  const cell = active.closest("td, th");
  const row = active.closest("tr");
  const table = active.closest("table");
  if (!cell || !row || !table) return null;

  const cellIndex = [...row.children].indexOf(cell);
  if (cellIndex < 0) return null;

  const rows = [...table.querySelectorAll("tbody tr")];
  const rowIndex = rows.indexOf(row);
  if (rowIndex < 0) return null;

  for (let index = rowIndex + 1; index < rows.length; index += 1) {
    const nextRow = rows[index];
    const nextCell = nextRow.children[cellIndex];
    if (!nextCell) continue;
    const nextEditable = getEditableElements(nextCell)[0];
    if (nextEditable) return nextEditable;
  }

  return null;
}

function getNextEditableInScope(active) {
  const scope = active.closest("form, .panel, body") || document.body;
  const editables = getEditableElements(scope);
  const currentIndex = editables.indexOf(active);
  if (currentIndex < 0) return null;
  return editables[currentIndex + 1] || null;
}

function focusEditable(element) {
  element.focus();
  if (typeof element.select === "function" && element.matches('input:not([type="number"]), textarea')) {
    element.select();
  }
}

async function runKegLevelSync() {
  kegSyncLoading = true;
  kegSyncMessage = "Checking Pour My Beer for live keg levels...";
  renderKegLevels();

  try {
    const response = await fetch("/api/keg-levels");
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error || "Could not load keg levels.");
    }

    kegLiveLevels = buildKegLiveLevelMap(result.items || []);
    kegDeviceLevels = buildKegDeviceLevelsMap(result.deviceLevels || {});
    kegTemplateAssignments = buildKegTemplateAssignments();
    kegUpdatedAt = result.updatedAt || new Date().toISOString();
    kegSyncMessage = `Found live levels for ${result.items?.length || 0} products.`;
  } catch (error) {
    kegSyncMessage = error.message || "Could not load live keg levels.";
  } finally {
    kegSyncLoading = false;
    renderKegLevels();
  }
}

async function runKegConfigUpdate() {
  kegConfigUpdateRunning = true;
  kegSyncMessage = "Sending config update to Pour My Beer...";
  renderKegLevels();

  try {
    const response = await fetch("/api/keg-config-update", {
      method: "POST",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error || "Could not send config update.");
    }

    kegSyncMessage = result.message || "Configuration update sent.";
  } catch (error) {
    kegSyncMessage = error.message || "Could not send config update.";
  } finally {
    kegConfigUpdateRunning = false;
    renderKegLevels();
  }
}

function getKegItemKey(item) {
  return item.id || slugify(`${item.wall}-${item.tapNumber}-${item.brand}`);
}

function getKegOnHandDisplay(item) {
  return String(kegOnHandOverrides[getKegItemKey(item)] ?? "");
}

function getKegParDisplay(item) {
  return String(kegParOverrides[getKegItemKey(item)] ?? "");
}

function getKegNeed(item) {
  const onHand = toNumber(getKegOnHandDisplay(item));
  const par = toNumber(getKegParDisplay(item));
  if (!par) return 0;
  return Math.max(0, Math.round(par - onHand));
}

function getKegLiveRow(item) {
  return kegTemplateAssignments.get(getKegItemKey(item)) || null;
}

function normalizeKegProductName(value) {
  return clean(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/\)\s*(\d)\s*$/g, " $1")
    .replace(/([A-Za-z])(\d)$/g, "$1 $2")
    .replace(/[()]/g, " ")
    .replace(/\b(cognac|rum|tequila|vodka|whiskey|bourbon|beer|lager|blonde|ipa|wheat|import|stout|sour|cider|seltzer|seasonal|strong ale|shots|cocktail)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function buildKegLiveLevelMap(items) {
  const map = new Map();

  items.forEach((item) => {
    const aliases = getKegNameAliases(item.name);
    aliases.forEach((alias) => {
      if (alias && !map.has(alias)) {
        map.set(alias, item);
      }
    });
  });

  return map;
}

function buildKegDeviceLevelsMap(rawDeviceLevels) {
  return new Map(
    Object.entries(rawDeviceLevels).map(([deviceId, levels]) => [
      String(deviceId),
      Array.isArray(levels) ? levels.slice().sort((a, b) => a.lineNum - b.lineNum) : [],
    ]),
  );
}

function buildKegTemplateAssignments() {
  const matchedRows = kegWallItems
    .map((item) => {
      const matchedProduct = getNamedKegProduct(item);
      return matchedProduct ? { item, matchedProduct } : null;
    })
    .filter(Boolean);

  const byDevice = new Map();
  matchedRows.forEach((entry) => {
    const deviceId = String(entry.matchedProduct.deviceId || "");
    if (!deviceId) return;
    if (!byDevice.has(deviceId)) byDevice.set(deviceId, []);
    byDevice.get(deviceId).push(entry);
  });

  const assignments = new Map();
  byDevice.forEach((entries, deviceId) => {
    const levels = kegDeviceLevels.get(deviceId) || [];
    const orderedEntries = entries
      .slice()
      .sort((a, b) => b.item.tapNumber - a.item.tapNumber);

    orderedEntries.forEach((entry, index) => {
      const level = levels[index] || null;
      assignments.set(getKegItemKey(entry.item), {
        ...entry.matchedProduct,
        fillLevelPercent: level?.fillLevelPercent ?? null,
        rawPercent: level?.rawPercent ?? entry.matchedProduct.rawPercent ?? null,
        rawKegSize: level?.rawKegSize ?? entry.matchedProduct.rawKegSize ?? null,
        rawKegSizeDp: level?.rawKegSizeDp ?? entry.matchedProduct.rawKegSizeDp ?? null,
        volumeUnit: entry.matchedProduct.volumeUnit || "",
        volumeUnitDp: entry.matchedProduct.volumeUnitDp ?? 0,
        lineNum: level?.lineNum ?? entry.matchedProduct.lineNum,
      });
    });
  });

  return assignments;
}

function getNamedKegProduct(item) {
  const normalized = normalizeKegProductName(item.brand);
  return kegLiveLevels.get(normalized) || null;
}

function getKegNameAliases(name) {
  const raw = clean(name);
  const aliases = new Set();
  const normalized = normalizeKegProductName(raw);
  if (normalized) aliases.add(normalized);

  const withoutWallNumber = raw.replace(/\s+\d+$/, "").trim();
  const normalizedWithoutWall = normalizeKegProductName(withoutWallNumber);
  if (normalizedWithoutWall) aliases.add(normalizedWithoutWall);

  const withoutParenthetical = raw.replace(/\(([^)]+)\)/g, " $1 ").trim();
  const normalizedWithoutParen = normalizeKegProductName(withoutParenthetical);
  if (normalizedWithoutParen) aliases.add(normalizedWithoutParen);

  const compact = normalizeKegProductName(
    raw.replace(/\(([^)]+)\)/g, " ").replace(/\s+\d+$/, "").trim(),
  );
  if (compact) aliases.add(compact);

  if (/gin\s*&?\s*juice/i.test(raw) && /bombay sapphire/i.test(raw)) {
    aliases.add(normalizeKegProductName(raw.replace(/bombay sapphire/gi, "bombay")));
  }

  if (/gin\s*&?\s*juice/i.test(raw) && /\bbombay\b/i.test(raw)) {
    aliases.add(normalizeKegProductName(raw.replace(/\bbombay\b/gi, "bombay sapphire")));
  }

  return [...aliases];
}

function isLiquorOunceTap(tapNumber) {
  return (tapNumber >= 1 && tapNumber <= 20) || (tapNumber >= 83 && tapNumber <= 92);
}

function getKegCurrentLevelOz(liveRow) {
  if (!liveRow) return null;
  const rawPercent = toNumber(liveRow.rawPercent);
  const rawKegSize = toNumber(liveRow.rawKegSize);
  if (!rawPercent || !rawKegSize) return null;

  const assumedFullOunces = rawKegSize <= 500 ? rawKegSize / 10 : rawKegSize;
  const currentOunces = (rawPercent / 10000) * assumedFullOunces;
  return Number.isFinite(currentOunces) ? currentOunces : null;
}

function formatKegCurrentLevel(item, liveRow) {
  if (!liveRow) return "—";
  if (isLiquorOunceTap(toNumber(item?.tapNumber))) {
    const currentOunces = getKegCurrentLevelOz(liveRow);
    return Number.isFinite(currentOunces) ? `${formatNumber(currentOunces)} oz` : "—";
  }
  return formatKegLevelPercent(liveRow.fillLevelPercent);
}

function getKegCurrentFraction(item, liveRow) {
  if (!liveRow) return 0;
  if (isLiquorOunceTap(toNumber(item?.tapNumber))) {
    const currentOunces = getKegCurrentLevelOz(liveRow);
    const rawKegSize = toNumber(liveRow.rawKegSize);
    const fullOunces = rawKegSize <= 500 ? rawKegSize / 10 : rawKegSize;
    return currentOunces && fullOunces ? currentOunces / fullOunces : 0;
  }
  const percent = toNumber(liveRow.fillLevelPercent);
  return percent > 0 ? percent / 100 : 0;
}

function getKegCurrentValue(item, liveRow) {
  const pricingItem = findKegPricingItem(item.brand);
  if (!pricingItem) return 0;
  const kegPrice = getKegPrice(pricingItem);
  const fraction = getKegCurrentFraction(item, liveRow);
  if (!kegPrice || !fraction) return 0;
  return kegPrice * fraction;
}

function findKegPricingItem(name) {
  const key = getKegPricingKey(name);
  return kegPricingItems.find((entry) => entry.id === key) || null;
}

function getKegRowTypeClass(item) {
  if (isLiquorOunceTap(toNumber(item.tapNumber))) return "keg-row--liquor";
  if (normalizeTitle(item.type) === "cocktail") return "keg-row--cocktail";
  return "keg-row--beer";
}

function formatKegLevelPercent(value) {
  if (!Number.isFinite(value)) return "—";
  return `${formatNumber(value)}%`;
}

function getKegLevelClass(value) {
  if (!Number.isFinite(value)) return "keg-level-unknown";
  if (value <= 15) return "keg-level-critical";
  if (value <= 30) return "keg-level-low";
  return "keg-level-ok";
}

function renderInventorySummary(visibleItems, reorderItems) {
  const totalValue = sum(visibleItems.filter((item) => !item.excludeFromInventoryValue).map((item) => item.totalValue));
  const reorderCost = sum(reorderItems.filter((item) => !item.excludeFromInventoryValue).map((item) => getInventoryRoundedOrderQuantity(item) * item.unitCost));
  const reorderUnits = sum(reorderItems.map((item) => getInventoryRoundedOrderQuantity(item)));
  const latestSnapshot = inventoryHistory[0];

  inventorySummary.innerHTML = `
    <h2>Inventory Snapshot</h2>
    <div class="summary-line"><span>Tracked items</span><strong>${visibleItems.length}</strong></div>
    <div class="summary-line"><span>Current bottle inventory $</span><strong>${money(totalValue)}</strong></div>
    <div class="summary-line"><span>Items to reorder</span><strong>${reorderItems.length}</strong></div>
    <div class="summary-line"><span>Total units to order</span><strong>${formatNumber(reorderUnits)}</strong></div>
    <div class="summary-line"><span>Estimated reorder cost</span><strong>${money(reorderCost)}</strong></div>
    <div class="sync-panel inventory-actions-panel">
      <button class="primary-button" id="save-inventory-snapshot" type="button">Save Weekly Snapshot</button>
      <p class="sync-copy">This saves the current inventory in this browser so you can look back week by week.</p>
      <p class="sync-status">${latestSnapshot ? `Last saved ${escapeHtml(formatUpdatedAt(latestSnapshot.savedAt))}` : "No weekly snapshots saved yet."}</p>
    </div>
  `;

  bindInventorySummaryEvents();
}

function bindInventorySummaryEvents() {
  document.querySelector("#save-inventory-snapshot")?.addEventListener("click", saveInventorySnapshot);
}

function renderInventoryStockTable(groupedItems) {
  inventoryTable.innerHTML = "";
  const allVisibleItems = groupedItems.flatMap(([, items]) => items);
  const totalValue = sum(allVisibleItems.filter((item) => !item.excludeFromInventoryValue).map((item) => item.totalValue));

  groupedItems.forEach(([groupName, items]) => {
    inventoryTable.append(createInventoryGroupRow(groupName));
    items.forEach((item) => inventoryTable.append(createInventoryRow(item, "stock")));
  });

  inventoryTable.append(createInventoryTotalRow("Current bottle inventory total", money(totalValue)));
}

function renderInventoryOrderTable(reorderItems) {
  inventoryOrderTable.innerHTML = "";

  if (!reorderItems.length) {
    inventoryOrderTable.innerHTML = `<tr><td colspan="6" class="muted">Nothing needs to be ordered right now.</td></tr>`;
    return;
  }

  groupInventoryForDisplay(reorderItems).forEach(([groupName, items]) => {
    inventoryOrderTable.append(createInventoryGroupRow(groupName));
    items.forEach((item) => inventoryOrderTable.append(createInventoryRow(item, "order")));
  });

  const vendorTotals = getInventoryVendorTotals(reorderItems);
  ["OHLQ", "Proof"].forEach((vendorName) => {
    const total = vendorTotals.get(vendorName) || 0;
    inventoryOrderTable.append(createInventoryTotalRow(`${vendorName} reorder total`, money(total), "inventory-subtotal-row"));
  });

  const reorderCost = sum(reorderItems.filter((item) => !item.excludeFromInventoryValue).map((item) => getInventoryRoundedOrderQuantity(item) * item.unitCost));
  inventoryOrderTable.append(createInventoryTotalRow("Estimated reorder total", money(reorderCost)));
}

function createInventoryGroupRow(groupName) {
  const row = document.createElement("tr");
  row.className = "inventory-group-row";
  row.innerHTML = `<td colspan="6">${escapeHtml(groupName)}</td>`;
  return row;
}

function createInventoryTotalRow(label, value, className = "inventory-total-row") {
  const row = document.createElement("tr");
  row.className = className;
  row.innerHTML = `
    <td colspan="5"><strong>${escapeHtml(label)}</strong></td>
    <td><strong>${escapeHtml(value)}</strong></td>
  `;
  return row;
}

function getInventoryVendorTotals(items) {
  const totals = new Map();

  items.forEach((item) => {
    if (item.excludeFromInventoryValue) return;
    const vendorName = item.vendorProduct?.vendor || "Other";
    const currentTotal = totals.get(vendorName) || 0;
    totals.set(vendorName, currentTotal + getInventoryRoundedOrderQuantity(item) * item.unitCost);
  });

  return totals;
}

function createInventoryRow(item, mode) {
  const row = document.createElement("tr");
  const orderQuantityForMode = mode === "order" ? getInventoryRoundedOrderQuantity(item) : item.orderQuantity;
  const costCell = mode === "order" ? money(orderQuantityForMode * item.unitCost) : money(item.totalValue);
  row.className = mode === "order" && item.orderQuantity > 0 ? "inventory-row--order" : "";
  const inputMode = item.allowsDecimal ? "decimal" : "numeric";
  const isParEditable = Boolean(inventoryParEditState[item.id]);
  const linkedNotes = [];
  if (item.linkedIngredientName) linkedNotes.push(`<span class="table-note table-note--accent">Linked to ${escapeHtml(item.linkedIngredientName)}</span>`);
  if (item.vendorProduct) linkedNotes.push(`<span class="table-note table-note--accent">${escapeHtml(item.vendorProduct.vendor)} mapped</span><span class="table-note">${escapeHtml(item.vendorProduct.productName)}</span>`);
  row.innerHTML = `
    <td><strong>${escapeHtml(item.name)}</strong>${item.note ? `<span class="table-note">${escapeHtml(item.note)}</span>` : ""}${linkedNotes.join("")}</td>
    <td>${mode === "stock" ? `<input class="inventory-input" data-field="onHand" type="text" inputmode="${inputMode}" value="${escapeHtml(item.onHandDisplay)}" aria-label="On hand for ${escapeHtml(item.name)}">` : formatInventoryQuantity(item.onHandDisplay)}</td>
    <td>${mode === "stock" ? `<div class="inventory-par-cell"><input class="inventory-input inventory-input--par ${isParEditable ? "is-editing" : "is-locked"}" data-field="par" type="text" inputmode="${inputMode}" value="${escapeHtml(item.parDisplay)}" aria-label="Par for ${escapeHtml(item.name)}" ${isParEditable ? "" : "readonly"}><button class="mini-button inventory-par-toggle" data-par-toggle="${escapeHtml(item.id)}" type="button">${isParEditable ? "Done" : "Edit"}</button></div>` : formatInventoryQuantity(item.parDisplay)}</td>
    <td data-cell="order" class="${item.orderQuantity > 0 ? "inventory-order-flag" : "muted"}">${formatInventoryQuantity(mode === "order" ? orderQuantityForMode : item.orderDisplay)}</td>
    <td>${money(item.unitCost)}</td>
    <td data-cell="cost">${costCell}</td>
  `;
  if (mode === "stock") {
    row.querySelectorAll("input").forEach((input) => {
      const field = input.dataset.field;
      input.addEventListener("focus", () => input.select());
      input.addEventListener("input", () => previewInventoryValue(item.id, field, input.value, row));
      input.addEventListener("change", () => commitInventoryValue(item.id, field, input.value));
      input.addEventListener("blur", () => {
        commitInventoryValue(item.id, field, input.value);
        input.value = getInventoryDisplayValue(findInventoryItem(item.id), field);
        syncInventoryRowCells(row, findInventoryItem(item.id));
        renderInventoryPanels();
      });
    });
    row.querySelector('[data-par-toggle]')?.addEventListener("click", () => toggleInventoryParEdit(item.id));
  }
  return row;
}

function getInventoryRoundedOrderQuantity(item) {
  if (!item?.orderQuantity || item.orderQuantity <= 0) return 0;
  if (item.group !== "Mixer Cabinet") return item.orderQuantity;
  return Math.ceil(item.orderQuantity / 12) * 12;
}

function previewInventoryValue(id, field, value, row) {
  const item = findInventoryItem(id);
  if (!item) return;

  setInventoryItemDisplayValue(item, field, value);
  syncInventoryRowCells(row, item);
  persistInventoryField(id, field, value);
  renderInventoryPanels();
}

function commitInventoryValue(id, field, value) {
  const item = findInventoryItem(id);
  if (!item) return;

  const normalized = normalizeInventoryInputValue(value, item.allowsDecimal);
  setInventoryItemDisplayValue(item, field, normalized);
  persistInventoryField(id, field, normalized);
}

function syncInventoryRowCells(row, item) {
  const orderCell = row.querySelector('[data-cell="order"]');
  const costCell = row.querySelector('[data-cell="cost"]');
  if (orderCell) {
    orderCell.textContent = formatInventoryQuantity(item.orderDisplay);
    orderCell.className = item.orderQuantity > 0 ? "inventory-order-flag" : "muted";
  }
  if (costCell) {
    costCell.textContent = money(item.totalValue);
  }
}

function renderInventoryPanels() {
  const visibleItems = getVisibleInventoryItems();
  const reorderItems = getInventoryReorderItems(visibleItems);
  renderInventorySummary(visibleItems, reorderItems);
  renderInventoryOrderTable(reorderItems);
}

function getInventoryReorderItems(sourceItems) {
  return sourceItems.filter((item) => item.orderQuantity > 0 && !item.excludeFromOrderList);
}

function syncInventoryItemCatalogLinks() {
  const ingredientById = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));

  inventoryItems.forEach((item) => {
    const ingredient = ingredientById.get(item.id) || null;
    item.linkedIngredientName = ingredient?.name || item.name;
    item.vendorProduct = ingredient?.vendorProduct || getVendorMapping(item.id) || null;
    item.unitCost = getInventoryBottleCost(item, ingredient);
    recalculateInventoryItem(item);
  });
}

function getInventoryBottleCost(item, ingredient) {
  const override = priceOverrides[item.id];
  const overrideBottlePrice = toNumber(override?.bottlePrice);
  if (overrideBottlePrice > 0) return overrideBottlePrice;

  if (ingredient) {
    const catalogBottleCost = getIngredientBottleCost(ingredient);
    if (catalogBottleCost > 0) return catalogBottleCost;
  }

  return item.baseUnitCost || item.unitCost || 0;
}

function getVisibleInventoryItems() {
  const searchTerm = inventorySearch.value.trim().toLowerCase();
  return inventoryItems.filter((item) => {
    const haystack = `${item.name} ${item.group} ${item.sourceSection}`.toLowerCase();
    return haystack.includes(searchTerm);
  });
}

function findInventoryItem(id) {
  return inventoryItems.find((item) => item.id === id) || null;
}

function setInventoryItemDisplayValue(item, field, value) {
  if (field === "par") {
    item.parDisplay = clean(value);
  } else {
    item.onHandDisplay = clean(value);
  }
  recalculateInventoryItem(item);
}

function getInventoryDisplayValue(item, field) {
  if (!item) return "";
  return field === "par" ? item.parDisplay : item.onHandDisplay;
}

function persistInventoryField(id, field, value) {
  if (field === "par") {
    persistInventoryOverride(inventoryParOverrides, saveInventoryParOverrides, id, value);
    return;
  }
  persistInventoryOverride(inventoryOnHandOverrides, saveInventoryOnHandOverrides, id, value);
}

function persistInventoryOverride(store, saveFn, id, value) {
  const normalized = clean(value);
  if (!normalized) {
    delete store[id];
  } else {
    store[id] = normalized;
  }
  saveFn();
}

function normalizeInventoryInputValue(value, allowsDecimal) {
  const normalized = clean(value);
  if (!normalized) return "";

  const number = toNumber(normalized);
  if (!Number.isFinite(number)) return "";
  if (allowsDecimal) return String(number);
  return String(Math.round(number));
}

function recalculateInventoryItem(item) {
  item.onHand = toNumber(item.onHandDisplay);
  item.par = toNumber(item.parDisplay);
  item.totalValue = item.onHand * item.unitCost;
  item.orderQuantity = item.par > item.onHand ? item.par - item.onHand : 0;
  item.orderDisplay = item.orderQuantity > 0 ? String(item.orderQuantity) : "0";
}

function toggleInventoryParEdit(id) {
  inventoryParEditState[id] = !inventoryParEditState[id];
  renderInventory();
}

function saveInventorySnapshot() {
  const snapshot = {
    id: `inventory-${Date.now()}`,
    savedAt: new Date().toISOString(),
    items: getInventorySnapshotItems(),
  };

  inventoryHistory = [snapshot, ...inventoryHistory];
  saveInventoryHistory();
  renderInventorySummary(getVisibleInventoryItems(), getInventoryReorderItems(getVisibleInventoryItems()));
  renderInventoryHistory();
}

function getInventorySnapshotItems() {
  return groupInventoryForDisplay([...inventoryItems]).flatMap(([, items]) => items).map((item) => ({
    name: item.name,
    group: item.group,
    onHandDisplay: item.onHandDisplay,
    parDisplay: item.parDisplay,
    orderDisplay: item.orderDisplay,
    unitCost: item.unitCost,
    totalValue: item.totalValue,
    note: item.note,
  }));
}

function renderInventoryHistory() {
  if (!inventoryHistoryList) return;

  if (!inventoryHistory.length) {
    inventoryHistoryList.innerHTML = `<div class="empty-state">Save a weekly snapshot here each Monday and your past inventory counts will stay available on this computer.</div>`;
    return;
  }

  inventoryHistoryList.innerHTML = inventoryHistory.map((snapshot, index) => {
    const reorderItems = snapshot.items.filter((item) => toNumber(item.orderDisplay) > 0);
    const totalValue = sum(snapshot.items.map((item) => item.totalValue));
    const reorderCost = sum(reorderItems.map((item) => toNumber(item.orderDisplay) * item.unitCost));

    return `
      <details class="inventory-history-card"${index === 0 ? " open" : ""}>
        <summary>
          <div class="inventory-history-heading">
            <strong>${escapeHtml(formatInventorySnapshotLabel(snapshot.savedAt))}</strong>
            <span>Saved ${escapeHtml(formatUpdatedAt(snapshot.savedAt))}</span>
            <span>${snapshot.items.length} items saved</span>
          </div>
          <div class="inventory-history-stats">
            <span>${money(totalValue)} on hand</span>
            <span>${money(reorderCost)} to reorder</span>
          </div>
        </summary>
        <div class="inventory-history-card__body">
          <div class="inventory-history-actions">
            <button class="ghost-button inventory-history-restore" data-snapshot-id="${escapeHtml(snapshot.id)}" type="button">Recall Snapshot</button>
            <button class="ghost-button inventory-history-delete" data-snapshot-id="${escapeHtml(snapshot.id)}" type="button">Delete snapshot</button>
          </div>
          <div class="inventory-table-wrap">
            <table class="inventory-table">
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
              <tbody>
                ${renderInventoryHistoryRows(snapshot.items)}
              </tbody>
            </table>
          </div>
        </div>
      </details>
    `;
  }).join("");

  inventoryHistoryList.querySelectorAll(".inventory-history-restore").forEach((button) => {
    button.addEventListener("click", () => restoreInventorySnapshot(button.dataset.snapshotId));
  });
  inventoryHistoryList.querySelectorAll(".inventory-history-delete").forEach((button) => {
    button.addEventListener("click", () => deleteInventorySnapshot(button.dataset.snapshotId));
  });
}

function renderInventoryHistoryRows(items) {
  const grouped = groupInventorySnapshotItems(items);
  return grouped.map(([groupName, groupItems]) => `
    <tr class="inventory-group-row"><td colspan="6">${escapeHtml(groupName)}</td></tr>
    ${groupItems.map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.name)}</strong>${item.note ? `<span class="table-note">${escapeHtml(item.note)}</span>` : ""}</td>
        <td>${formatInventoryQuantity(item.onHandDisplay)}</td>
        <td>${formatInventoryQuantity(item.parDisplay)}</td>
        <td class="${toNumber(item.orderDisplay) > 0 ? "inventory-order-flag" : "muted"}">${formatInventoryQuantity(item.orderDisplay)}</td>
        <td>${money(item.unitCost)}</td>
        <td>${money(item.totalValue)}</td>
      </tr>
    `).join("")}
  `).join("");
}

function groupInventorySnapshotItems(sourceItems) {
  const grouped = new Map();

  sourceItems.forEach((item) => {
    if (!grouped.has(item.group)) {
      grouped.set(item.group, []);
    }
    grouped.get(item.group).push(item);
  });

  return ["Liquor Cabinet", "Mixer Cabinet"]
    .map((groupName) => [
      groupName,
      (grouped.get(groupName) || []).sort((a, b) => getInventorySortKey(a).localeCompare(getInventorySortKey(b))),
    ])
    .filter(([, items]) => items.length);
}

function deleteInventorySnapshot(snapshotId) {
  inventoryHistory = inventoryHistory.filter((snapshot) => snapshot.id !== snapshotId);
  saveInventoryHistory();
  renderInventoryHistory();
  renderInventorySummary(getVisibleInventoryItems(), getInventoryReorderItems(getVisibleInventoryItems()));
}

function restoreInventorySnapshot(snapshotId) {
  const snapshot = inventoryHistory.find((entry) => entry.id === snapshotId);
  if (!snapshot) return;

  inventoryOnHandOverrides = {};
  inventoryParOverrides = {};

  snapshot.items.forEach((item) => {
    const id = slugify(item.name);
    if (clean(item.onHandDisplay)) {
      inventoryOnHandOverrides[id] = clean(item.onHandDisplay);
    }
    if (clean(item.parDisplay)) {
      inventoryParOverrides[id] = clean(item.parDisplay);
    }
  });

  saveInventoryOnHandOverrides();
  saveInventoryParOverrides();
  inventoryItems.forEach((item) => {
    item.onHandDisplay = inventoryOnHandOverrides[item.id] ?? "";
    item.parDisplay = inventoryParOverrides[item.id] ?? "";
    recalculateInventoryItem(item);
  });
  renderInventory();
}

function saveIngredientOverride(id, bottleOz, bottlePrice) {
  const nextOverride = {
    ...(priceOverrides[id] || {}),
    bottleOz,
    bottlePrice,
    updatedAt: new Date().toISOString(),
  };

  delete nextOverride.previousBottlePrice;
  delete nextOverride.previousUpdatedAt;

  if (!nextOverride.bottleOz && !nextOverride.bottlePrice) {
    delete priceOverrides[id];
  } else {
    priceOverrides[id] = nextOverride;
  }
  saveOverrides();
  render();
}

function saveKegPriceOverride(id, kegOz, kegPrice) {
  const existingOverride = kegPriceOverrides[id] || {};
  const nextKegPrice = toNumber(kegPrice);
  const previousKegPrice = toNumber(existingOverride.kegPrice);
  const didPriceChange = nextKegPrice > 0 && previousKegPrice > 0 && Math.abs(nextKegPrice - previousKegPrice) > 0.001;
  const nextOverride = {
    ...existingOverride,
    kegOz,
    kegPrice,
    updatedAt: new Date().toISOString(),
    previousKegPrice: didPriceChange ? String(previousKegPrice) : existingOverride.previousKegPrice || "",
    previousUpdatedAt: didPriceChange ? existingOverride.updatedAt || "" : existingOverride.previousUpdatedAt || "",
  };

  if (!nextOverride.kegOz && !nextOverride.kegPrice) {
    delete kegPriceOverrides[id];
  } else {
    kegPriceOverrides[id] = nextOverride;
  }

  saveKegPriceOverrides();
  render();
}

function setChargeOverride(id, value) {
  if (value) {
    chargeOverrides[id] = value;
  } else {
    delete chargeOverrides[id];
  }
  saveChargeOverrides();
  renderStats();
  renderRecipes();
  renderPricingSummary();
}

function addCustomRecipe(event) {
  event.preventDefault();
  const title = clean(document.querySelector("#new-recipe-title").value);
  if (!title) return;

  const ingredientsForRecipe = [...newIngredientRows.querySelectorAll("tr")].map((row) => {
    const nameInput = row.querySelector('[data-field="ingredient-name"]');
    const quantityInput = row.querySelector('[data-field="ingredient-quantity"]');
    const ozInput = row.querySelector('[data-field="ingredient-oz"]');
    const inputName = clean(nameInput.value);
    const name = normalizeIngredientAlias(inputName);
    const packageConfig = getRecipeBuilderPackageConfig(name);
    const packageCount = clean(quantityInput?.value);
    const oz = toNumber(ozInput.value);
    return {
      id: slugify(name),
      raw: buildRecipeIngredientRaw(name, packageCount, packageConfig),
      name,
      cost: estimateIngredientCost(name, oz),
      oz,
      packageCount,
      packageUnit: packageConfig?.unitLabel || "",
      packageSizeOz: packageConfig?.sizeOz || 0,
    };
  }).filter((ingredient) => ingredient.name);

  const recipe = {
    id: editingRecipeId || `custom-${Date.now()}-${slugify(title)}`,
    title,
    batch: DEFAULT_BATCH_LABEL,
    category: clean(document.querySelector("#new-recipe-category").value) || "Other",
    defaultChargePerOz: toNumber(document.querySelector("#new-recipe-charge").value),
    ingredients: ingredientsForRecipe,
    metrics: [],
    isCustom: editingRecipeId ? recipes.find((item) => item.id === editingRecipeId)?.isCustom === true : true,
  };

  if (editingRecipeId) {
    const existingRecipe = recipes.find((item) => item.id === editingRecipeId);
    recipe.sourceTitle = existingRecipe?.sourceTitle;
    recipes = recipes.map((item) => (item.id === editingRecipeId ? recipe : item));

    if (recipe.isCustom) {
      customRecipes = customRecipes.map((item) => (item.id === editingRecipeId ? recipe : item));
      saveCustomRecipes();
    } else {
      editedRecipes[recipe.id] = {
        title: recipe.title,
        batch: recipe.batch,
        category: recipe.category,
        defaultChargePerOz: recipe.defaultChargePerOz,
        ingredients: recipe.ingredients,
      };
      saveEditedRecipes();
    }
  } else {
    customRecipes.push(recipe);
    recipes.push(recipe);
    saveCustomRecipes();
  }

  resetRecipeForm();
  switchTab("recipes");
  render();
}

function addIngredientRow(ingredient = null) {
  const row = document.createElement("tr");
  const isFirstRow = newIngredientRows.children.length === 0;
  if (isFirstRow) row.classList.add("primary-liquor-row");
  const packageConfig = getRecipeBuilderPackageConfig(ingredient?.name || "");
  const quantityValue = getRecipeBuilderQuantityValue(ingredient, packageConfig);
  const ozValue = packageConfig ? calculateRecipeBuilderOunces(quantityValue, packageConfig) || ingredient?.oz || "" : ingredient?.oz || "";
  row.innerHTML = `
    <td>
      ${isFirstRow ? '<span class="row-badge">Liquor row</span>' : ""}
      <input data-field="ingredient-name" type="text" value="${escapeHtml(ingredient?.name || "")}" placeholder="${isFirstRow ? "Liquor / primary alcohol" : "Ingredient name"}" aria-label="${isFirstRow ? "New recipe primary liquor" : "New recipe ingredient"}">
    </td>
    <td>
      <input data-field="ingredient-quantity" type="text" inputmode="decimal" value="${escapeHtml(quantityValue)}" placeholder="${packageConfig?.unitLabel === "gallons" ? "2.5" : "1"}" aria-label="New recipe ingredient bottle or gallon count">
      <span class="table-note" data-field="package-note">${escapeHtml(getRecipeBuilderPackageNote(packageConfig))}</span>
    </td>
    <td>
      <input data-field="ingredient-oz" type="text" inputmode="decimal" value="${escapeHtml(ozValue)}" placeholder="0" aria-label="New recipe ingredient ounces"${packageConfig ? " readonly" : ""}>
      <span class="table-note" data-field="oz-note">${escapeHtml(getRecipeBuilderOzNote(packageConfig))}</span>
    </td>
    <td><button class="icon-button" type="button" aria-label="Remove ingredient row">x</button></td>
  `;
  const nameInput = row.querySelector('[data-field="ingredient-name"]');
  const quantityInput = row.querySelector('[data-field="ingredient-quantity"]');
  const ozInput = row.querySelector('[data-field="ingredient-oz"]');
  nameInput.addEventListener("input", () => syncRecipeBuilderRow(row));
  quantityInput.addEventListener("input", () => syncRecipeBuilderRow(row));
  ozInput.addEventListener("input", () => syncRecipeBuilderRow(row, { preserveManualOz: true }));
  row.querySelector("button").addEventListener("click", () => row.remove());
  syncRecipeBuilderRow(row, { preserveManualOz: true });
  newIngredientRows.append(row);
}

function syncRecipeBuilderRow(row, options = {}) {
  const nameInput = row.querySelector('[data-field="ingredient-name"]');
  const quantityInput = row.querySelector('[data-field="ingredient-quantity"]');
  const ozInput = row.querySelector('[data-field="ingredient-oz"]');
  const packageNote = row.querySelector('[data-field="package-note"]');
  const ozNote = row.querySelector('[data-field="oz-note"]');
  const packageConfig = getRecipeBuilderPackageConfig(nameInput.value);

  if (packageNote) packageNote.textContent = getRecipeBuilderPackageNote(packageConfig);
  if (ozNote) ozNote.textContent = getRecipeBuilderOzNote(packageConfig);

  if (packageConfig) {
    ozInput.readOnly = true;
    const ounces = calculateRecipeBuilderOunces(quantityInput.value, packageConfig);
    ozInput.value = ounces ? formatNumber(ounces) : "";
  } else {
    ozInput.readOnly = false;
    if (!options.preserveManualOz) {
      ozInput.value = "";
    }
  }
}

function getRecipeBuilderPackageConfig(name) {
  const normalizedName = normalizeIngredientAlias(clean(name));
  if (!normalizedName) return null;

  const id = slugify(normalizedName);
  const override = priceOverrides[id];
  const overrideBottleOz = toNumber(override?.bottleOz);
  const mappedBottleOz = toNumber(getVendorMapping(id)?.bottleOz);
  const isGallon = getIngredientGroup(normalizedName) === "Buckeye Beverage";
  const sizeOz = isGallon ? (overrideBottleOz || 128) : (overrideBottleOz || mappedBottleOz);

  if (!sizeOz) return null;

  return {
    sizeOz,
    unitLabel: isGallon ? "gallons" : "bottles",
    unitSingle: isGallon ? "gallon" : "bottle",
  };
}

function getRecipeBuilderQuantityValue(ingredient, packageConfig) {
  if (!ingredient) return "";
  if (clean(ingredient.packageCount)) return clean(ingredient.packageCount);
  if (!packageConfig || !ingredient.oz) return "";

  const count = ingredient.oz / packageConfig.sizeOz;
  if (!Number.isFinite(count) || count <= 0) return "";
  return formatNumber(count);
}

function calculateRecipeBuilderOunces(quantityValue, packageConfig) {
  if (!packageConfig) return 0;
  const quantity = toNumber(quantityValue);
  if (!quantity) return 0;
  return quantity * packageConfig.sizeOz;
}

function getRecipeBuilderPackageNote(packageConfig) {
  if (!packageConfig) return "Enter ounces manually if this ingredient is not mapped yet.";
  return `${formatNumber(packageConfig.sizeOz)} oz per ${packageConfig.unitSingle}`;
}

function getRecipeBuilderOzNote(packageConfig) {
  if (!packageConfig) return "Manual ounces";
  return `Auto from ${packageConfig.unitLabel}`;
}

function buildRecipeIngredientRaw(name, packageCount, packageConfig) {
  const cleanedName = clean(name);
  const cleanedCount = clean(packageCount);
  if (!cleanedName || !cleanedCount || !packageConfig) return cleanedName;

  const count = toNumber(cleanedCount);
  const unit = count === 1 ? packageConfig.unitSingle : packageConfig.unitLabel;
  return `${cleanedName} ${formatNumber(count)} ${unit}`;
}

function getRecipeBuilderUnitCost(name) {
  const normalizedName = normalizeIngredientAlias(clean(name));
  if (!normalizedName) return 0;

  const id = slugify(normalizedName);
  const override = priceOverrides[id];
  const overrideBottleOz = toNumber(override?.bottleOz);
  const overrideBottlePrice = toNumber(override?.bottlePrice);
  if (overrideBottleOz && overrideBottlePrice) {
    return overrideBottlePrice / overrideBottleOz;
  }

  const catalogIngredient = ingredients.find((item) => item.id === id);
  if (catalogIngredient) {
    return getCatalogUnitCost(catalogIngredient);
  }

  return 0;
}

function estimateIngredientCost(name, ounces) {
  const unitCost = getRecipeBuilderUnitCost(name);
  if (!unitCost || !ounces) return 0;
  return unitCost * ounces;
}

function deactivateRecipe(id) {
  if (!inactiveRecipeIds.includes(id)) {
    inactiveRecipeIds.push(id);
  }
  saveInactiveRecipeIds();
  render();
}

function reactivateRecipe(id) {
  inactiveRecipeIds = inactiveRecipeIds.filter((recipeId) => recipeId !== id);
  saveInactiveRecipeIds();
  render();
}

function deleteCustomRecipe(id) {
  customRecipes = customRecipes.filter((recipe) => recipe.id !== id);
  recipes = recipes.filter((recipe) => recipe.id !== id);
  inactiveRecipeIds = inactiveRecipeIds.filter((recipeId) => recipeId !== id);
  delete chargeOverrides[id];
  saveCustomRecipes();
  saveInactiveRecipeIds();
  saveChargeOverrides();
  render();
}

function startEditingRecipe(id) {
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) return;

  editingRecipeId = id;
  recipeFormTitle.textContent = `Edit ${recipe.title}`;
  recipeSubmitButton.textContent = "Save changes";
  cancelEditButton.hidden = false;
  recipeForm.reset();
  newIngredientRows.innerHTML = "";
  document.querySelector("#new-recipe-title").value = recipe.title;
  document.querySelector("#new-recipe-category").value = recipe.category || "Other";
  document.querySelector("#new-recipe-charge").value = recipe.defaultChargePerOz || "";

  if (recipe.ingredients.length) {
    recipe.ingredients.forEach((ingredient) => addIngredientRow(ingredient));
  } else {
    addIngredientRow();
  }

  switchTab("add");
}

function resetRecipeForm() {
  editingRecipeId = null;
  recipeFormTitle.textContent = "Add a new cocktail";
  recipeSubmitButton.textContent = "Add recipe";
  cancelEditButton.hidden = true;
  recipeForm.reset();
  newIngredientRows.innerHTML = "";
  addIngredientRow();
  addIngredientRow();
  addIngredientRow();
}

function hydrateCategoryFilter(sourceRecipes) {
  const categories = [...new Set(sourceRecipes.map((recipe) => recipe.category))].sort();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  });
}

function applyMenuOrder(sourceRecipes) {
  return applyRecipeOrder(sourceRecipes, MENU_ORDER);
}

function applyRecipeOrder(sourceRecipes, order) {
  const byTitle = new Map(sourceRecipes.map((recipe) => [normalizeTitle(recipe.title), recipe]));

  return order.map(([displayTitle, sourceTitle]) => {
    const source = byTitle.get(normalizeTitle(sourceTitle));
    if (!source) return null;

    return {
      ...source,
      id: slugify(displayTitle),
      title: displayTitle,
      sourceTitle: source.title,
      ingredients: source.ingredients.map((ingredient) => {
        const mappedName = getIngredientName(ingredient.raw, displayTitle);
        return {
          ...ingredient,
          id: slugify(mappedName),
          name: mappedName,
        };
      }),
      metrics: source.metrics.map((metric) => ({ ...metric })),
    };
  }).filter(Boolean);
}

function applyRecipeEdits(recipe) {
  const edits = editedRecipes[recipe.id];
  if (!edits) return recipe;

  return {
    ...recipe,
    ...edits,
    ingredients: (edits.ingredients || []).map((ingredient) => ({
      ...ingredient,
      id: slugify(ingredient.name),
      raw: ingredient.raw || buildRecipeIngredientRaw(ingredient.name, ingredient.packageCount, getRecipeBuilderPackageConfig(ingredient.name)),
      name: ingredient.name,
      cost: toNumber(ingredient.cost),
      oz: toNumber(ingredient.oz),
      packageCount: clean(ingredient.packageCount),
      packageUnit: clean(ingredient.packageUnit),
      packageSizeOz: toNumber(ingredient.packageSizeOz),
    })),
  };
}

async function fetchCsv(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.text();
}

async function fetchOptionalCsv(path) {
  const response = await fetch(path);
  if (response.status === 404) return "";
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  return response.text();
}

function parseRecipes(rows) {
  const header = rows[0] || [];
  const batchRow = rows[1] || [];
  const groups = [];

  for (let index = 0; index < header.length; index += 1) {
    const title = clean(header[index]);
    const costHeader = clean(header[index + 1]).toLowerCase();
    const ozHeader = clean(header[index + 2]).toLowerCase();
    if (title && costHeader === "$" && ozHeader === "oz") {
      groups.push({ title, start: index });
    }
  }

  return groups.map((group) => {
    const ingredientsForRecipe = [];
    const metrics = [];

    rows.slice(2).forEach((row) => {
      const label = clean(row[group.start]);
      const costCell = clean(row[group.start + 1]);
      const ozCell = clean(row[group.start + 2]);
      if (!label) return;

      if (isMetricLabel(label)) {
        metrics.push({ label, value: costCell || ozCell });
        return;
      }

      ingredientsForRecipe.push({
        id: slugify(getIngredientName(label, group.title)),
        raw: label,
        name: getIngredientName(label, group.title),
        cost: toNumber(costCell),
        oz: toNumber(ozCell),
      });
    });

    return {
      id: slugify(group.title),
      title: group.title,
      batch: clean(batchRow[group.start]),
      category: inferCategory(group.title),
      defaultChargePerOz: getMetricNumber(metrics, "Price we're charging"),
      ingredients: ingredientsForRecipe,
      metrics,
    };
  });
}

function buildIngredientCatalog(sourceRecipes) {
  const byId = new Map();

  sourceRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!byId.has(ingredient.id)) {
        byId.set(ingredient.id, {
          id: ingredient.id,
          name: ingredient.name,
          vendorProduct: getVendorMapping(ingredient.id),
          totalCost: 0,
          totalOz: 0,
          recipes: [],
        });
      }

      const record = byId.get(ingredient.id);
      record.totalCost += ingredient.cost || 0;
      record.totalOz += ingredient.oz || 0;
      if (!record.recipes.includes(recipe.title)) {
        record.recipes.push(recipe.title);
      }
    });
  });

  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function getRecipeTotals(recipe) {
  const cost = sum(recipe.ingredients.map((ingredient) => getIngredientCost(ingredient).cost));
  const oz = sum(recipe.ingredients.map((ingredient) => ingredient.oz));
  const alcoholOz = sum(recipe.ingredients.map((ingredient) => ingredient.oz * getIngredientAbvFraction(ingredient)));
  return {
    cost,
    oz,
    costPerOz: oz ? cost / oz : 0,
    alcoholOz,
    abvPercent: oz ? (alcoholOz / oz) * 100 : 0,
  };
}

function getRecipePricing(recipe) {
  const totals = getRecipeTotals(recipe);
  const chargePerOz = toNumber(chargeOverrides[recipe.id]) || recipe.defaultChargePerOz || 0;
  const pourOz = getPourOzForAlcoholTarget(recipe, totals.oz);
  const profitPerOz = chargePerOz - totals.costPerOz;
  const revenue = chargePerOz * totals.oz;
  const profit = revenue - totals.cost;

  return {
    ...totals,
    chargePerOz,
    chargePerPour: chargePerOz * pourOz,
    revenue,
    profit,
    profitPerOz,
    margin: chargePerOz ? (profitPerOz / chargePerOz) * 100 : 0,
    pourOz,
  };
}

function getPourOzForAlcoholTarget(recipe, totalOz) {
  const primaryAlcoholOz = recipe.ingredients.find((ingredient) => ingredient.oz > 0)?.oz || 0;
  if (!primaryAlcoholOz || !totalOz) return 0;
  return 1.5 / (primaryAlcoholOz / totalOz);
}

function getCalculatedMetrics(recipe, totals, pricing) {
  return [
    { label: "Total price", value: money(totals.cost) },
    { label: "Total oz", value: formatNumber(totals.oz) },
    { label: "Pure alcohol oz", value: formatNumber(totals.alcoholOz) },
    { label: "Batch ABV", value: `${formatNumber(totals.abvPercent)}%` },
    { label: "Total price per oz", value: money(totals.costPerOz) },
    { label: "Price we're charging", value: money(pricing.chargePerOz) },
    { label: "Profit per oz", value: money(pricing.profitPerOz) },
    { label: "Profit margin", value: `${formatNumber(pricing.margin)}%` },
    { label: "Oz pour for 1.5 oz alcohol", value: pricing.pourOz ? formatNumber(pricing.pourOz) : "-" },
    { label: "Charge per pour", value: pricing.pourOz ? money(pricing.chargePerPour) : "-" },
  ];
}

function getIngredientCost(ingredient) {
  const resolvedId = getResolvedIngredientId(ingredient);
  const override = priceOverrides[resolvedId];
  const bottleOz = toNumber(override?.bottleOz);
  const bottlePrice = toNumber(override?.bottlePrice);

  if (bottleOz && bottlePrice && ingredient.oz) {
    return {
      cost: ingredient.oz * (bottlePrice / bottleOz),
      source: "override",
    };
  }

  const catalogIngredient = ingredients.find((item) => item.id === resolvedId);
  const catalogUnitCost = catalogIngredient ? getCatalogUnitCost(catalogIngredient) : 0;
  if (catalogUnitCost && ingredient.oz) {
    return {
      cost: ingredient.oz * catalogUnitCost,
      source: "catalog",
    };
  }

  return {
    cost: ingredient.cost || 0,
    source: "sheet",
  };
}

function getIngredientAbvFraction(ingredient) {
  const percent = getIngredientAbvPercent(ingredient);
  return percent ? percent / 100 : 0;
}

function getIngredientAbvPercent(ingredient) {
  const resolvedId = getResolvedIngredientId(ingredient);
  if (!resolvedId) return 0;
  if (Object.hasOwn(INGREDIENT_ABV_PERCENT, resolvedId)) {
    return INGREDIENT_ABV_PERCENT[resolvedId];
  }

  const mappedProduct = getVendorMapping(resolvedId);
  const parsedProofAbv = getAbvPercentFromProductName(mappedProduct?.productName);
  if (parsedProofAbv) return parsedProofAbv;

  return inferFallbackAbvPercent(ingredient.name);
}

function getResolvedIngredientId(ingredient) {
  const resolvedName = normalizeIngredientAlias(clean(ingredient?.name));
  if (!resolvedName) return clean(ingredient?.id);
  return slugify(resolvedName);
}

function getAbvPercentFromProductName(productName) {
  const cleaned = clean(productName);
  if (!cleaned) return 0;

  const proofMatch = cleaned.match(/\b(\d{2,3})(?:\s*proof|\s+(?=1(?:\.\d+)?l\b|750ml\b|375ml\b|16oz\b))/i);
  if (!proofMatch) return 0;

  const proof = Number.parseFloat(proofMatch[1]);
  if (!Number.isFinite(proof)) return 0;
  return proof / 2;
}

function inferFallbackAbvPercent(name) {
  const normalized = clean(name).toLowerCase();
  if (!normalized) return 0;
  if (normalized.includes("vodka") || normalized.includes("tequila")) return 40;
  if (normalized.includes("bourbon")) return 45;
  if (normalized.includes("whiskey") || normalized.includes("whisky")) return 40;
  if (normalized.includes("rum")) return 35;
  if (normalized.includes("gin")) return 40;
  if (normalized.includes("triple sec") || normalized.includes("schnapps") || normalized.includes("creme de cacao")) return 15;
  if (normalized.includes("kahlua")) return 20;
  if (normalized.includes("bitters")) return 44.7;
  return 0;
}

function getCatalogUnitCost(ingredient) {
  const override = priceOverrides[ingredient.id];
  const bottleOz = toNumber(override?.bottleOz);
  const bottlePrice = toNumber(override?.bottlePrice);
  if (bottleOz && bottlePrice) return bottlePrice / bottleOz;
  return ingredient.totalOz ? ingredient.totalCost / ingredient.totalOz : 0;
}

function getCatalogCost(ingredient) {
  return getCatalogUnitCost(ingredient) * ingredient.totalOz;
}

function buildKegPricingCatalog(sourceKegWallItems) {
  const byId = new Map();

  sourceKegWallItems
    .filter((item) => item.tapNumber >= 21 && item.tapNumber <= 46)
    .forEach((item) => {
      const id = getKegPricingKey(item.brand);
      const existing = byId.get(id);
      const tapLabel = `${item.wall} ${item.tapNumber}`;

      if (!existing) {
        byId.set(id, {
          id,
          name: getKegDisplayName(item.brand),
          tapNumber: item.tapNumber,
          wall: item.wall,
          type: item.type,
          kegOz: getDefaultKegSizeOz(item),
          vendor: getKegVendorLabel(item),
          sourceNames: [item.brand],
          sourceTaps: [tapLabel],
          sourceTypes: [item.type],
        });
        return;
      }

      if (!existing.sourceNames.includes(item.brand)) existing.sourceNames.push(item.brand);
      if (!existing.sourceTaps.includes(tapLabel)) existing.sourceTaps.push(tapLabel);
      if (!existing.sourceTypes.includes(item.type)) existing.sourceTypes.push(item.type);
      if (!existing.tapNumber || item.tapNumber < existing.tapNumber) {
        existing.tapNumber = item.tapNumber;
        existing.wall = item.wall;
      }
    });

  return [...byId.values()]
    .map((item) => ({
      ...item,
      tapSummary: item.sourceTaps.join(", "),
      typeSummary: [...new Set(item.sourceTypes)].join(", "),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getDefaultKegSizeOz(item) {
  const liveRow = getKegLiveRow(item);
  const rawKegSize = toNumber(liveRow?.rawKegSize);
  if (rawKegSize > 500) return rawKegSize;
  return 1984;
}

function getKegVendorLabel(item) {
  return KEG_VENDOR_MAPPINGS[getKegPricingKey(item?.brand || item?.name || "")] || "Needs mapping";
}

function getKegPricingKey(value) {
  return slugify(getKegDisplayName(value));
}

function getKegDisplayName(value) {
  return clean(value).replace(/\s+[12]$/, "").trim();
}

function getKegCatalogUnitCost(item) {
  const override = kegPriceOverrides[item.id];
  const kegOz = toNumber(override?.kegOz) || toNumber(item.kegOz);
  const kegPrice = toNumber(override?.kegPrice);
  if (kegOz && kegPrice) return kegPrice / kegOz;
  return 0;
}

function getKegPrice(item) {
  const override = kegPriceOverrides[item.id];
  const explicitPrice = toNumber(override?.kegPrice);
  if (explicitPrice > 0) return explicitPrice;
  const unitCost = getKegCatalogUnitCost(item);
  const kegOz = toNumber(override?.kegOz) || toNumber(item.kegOz);
  return unitCost && kegOz ? unitCost * kegOz : 0;
}

function getIngredientBottleCost(ingredient) {
  const override = priceOverrides[ingredient.id];
  const overrideBottlePrice = toNumber(override?.bottlePrice);
  if (overrideBottlePrice > 0) return overrideBottlePrice;

  const bottleOz = toNumber(override?.bottleOz) || toNumber(ingredient.vendorProduct?.bottleOz);
  const unitCost = getCatalogUnitCost(ingredient);
  if (bottleOz > 0 && unitCost > 0) return bottleOz * unitCost;
  return 0;
}

function countOverrides() {
  return Object.keys(priceOverrides).filter((key) => {
    const override = priceOverrides[key];
    return toNumber(override?.bottleOz) && toNumber(override?.bottlePrice);
  }).length;
}

function countKegPriceOverrides() {
  return Object.keys(kegPriceOverrides).filter((key) => {
    const override = kegPriceOverrides[key];
    return toNumber(override?.kegOz) && toNumber(override?.kegPrice);
  }).length;
}

function countVendorMappings(sourceIngredients = ingredients) {
  return sourceIngredients.filter((ingredient) => ingredient.vendorProduct).length;
}

function countVendorMappingsByName(sourceIngredients, vendorName) {
  return sourceIngredients.filter((ingredient) => ingredient.vendorProduct?.vendor === vendorName).length;
}

function groupKegPricingItemsForDisplay(sourceItems) {
  const grouped = new Map();

  sourceItems.forEach((item) => {
    const vendorName = item.vendor || "Needs mapping";
    if (!grouped.has(vendorName)) {
      grouped.set(vendorName, []);
    }
    grouped.get(vendorName).push(item);
  });

  return ["Heidelberg", "Bonbright", "Needs mapping"]
    .map((groupName) => [
      groupName,
      (grouped.get(groupName) || []).slice().sort((a, b) => a.name.localeCompare(b.name)),
    ])
    .filter(([, items]) => items.length);
}

function groupIngredientsForDisplay(sourceIngredients) {
  const grouped = new Map();

  sourceIngredients.forEach((ingredient) => {
    const groupName = getIngredientGroup(ingredient.name);
    if (!grouped.has(groupName)) {
      grouped.set(groupName, []);
    }
    grouped.get(groupName).push(ingredient);
  });

  return ["Liquor", "Proof", "Buckeye Beverage", "Food Vendors", "Made In House", "Other"]
    .map((groupName) => [
      groupName,
      (grouped.get(groupName) || []).sort((a, b) => getIngredientSortKey(a).localeCompare(getIngredientSortKey(b))),
    ])
    .filter(([, items]) => items.length);
}

function countChargeOverrides() {
  return Object.keys(chargeOverrides).filter((key) => toNumber(chargeOverrides[key])).length;
}

function getActiveRecipes() {
  return recipes.filter((recipe) => !inactiveRecipeIds.includes(recipe.id));
}

function getInactiveRecipes() {
  return recipes.filter((recipe) => inactiveRecipeIds.includes(recipe.id));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function parseInventory(rows) {
  const items = [];
  let currentSection = "Liquor";

  rows.forEach((row) => {
    const first = clean(row[0]);
    const last = clean(row[row.length - 1]);

    if (!first) return;
    if (/^total /i.test(first)) return;

    if (isInventorySectionRow(first, last)) {
      currentSection = first;
      return;
    }

    if (isInventoryHeaderRow(first)) return;

    const normalizedName = normalizeInventoryName(first);
    const unitCost = toNumber(row[3]);
    let note = clean(row[10]);
    if (normalizedName === "Bombay Sapphire" && /do not order for now/i.test(note)) {
      note = "";
    }
    const group = getInventoryGroup(normalizedName, currentSection);
    const id = slugify(normalizedName);
    const onHandDisplay = inventoryOnHandOverrides[id] ?? clean(row[1]);
    const parDisplay = inventoryParOverrides[id] ?? clean(row[7]);

    if (group === "Bottle Service" || group === "Bubbly") return;
    if (["Jameson", "Patron", "Pink Whitney", "Screwball"].includes(normalizedName)) return;

    const item = {
      id,
      name: normalizedName,
      group,
      allowsDecimal: normalizedName === "Sour Mix",
      sourceSection: currentSection,
      onHandDisplay,
      baseUnitCost: unitCost,
      unitCost,
      parDisplay,
      note,
      excludeFromOrderList: normalizedName === "Sour Mix",
      excludeFromInventoryValue: normalizedName === "Non Alcoholic Beer",
    };

    recalculateInventoryItem(item);
    items.push(item);
  });

  ensureInventoryPlaceholder(items, {
    name: "Non Alcoholic Beer",
    group: "Other",
    unitCost: 0,
    note: "Tracked separately",
    excludeFromInventoryValue: true,
  });

  return items;
}

function parseKegLevels(rows) {
  const items = [];
  let currentWall = "";

  rows.forEach((row) => {
    const cells = row.map(clean);
    const wallCell = cells.find((cell) => ["Patio", "Main Bar", "Karaoke"].includes(cell));
    if (wallCell) {
      currentWall = wallCell === "Main Bar" ? "Main" : wallCell;
      return;
    }

    const tapNumber = toNumber(cells[0]);
    if (!tapNumber || !currentWall) return;

    const type = cells[1];
    const brand = cells[2];
    if (!type || !brand) return;

    items.push({
      id: slugify(`${currentWall}-${tapNumber}-${brand}`),
      tapNumber,
      type,
      brand,
      wall: currentWall,
    });
  });

  return items.sort((a, b) => a.tapNumber - b.tapNumber);
}

function parseWeeklyUsage(rows) {
  const headerRow = rows[0] || [];
  const historyColumns = headerRow
    .map((value, index) => ({ label: clean(value).replace(/\s+/g, " "), index }))
    .filter((entry) => entry.index >= 6 && isWeeklyHistoryHeader(entry.label));

  return rows
    .slice(2)
    .map((row) => {
      const tapNumber = toNumber(row[1]);
      const name = clean(row[2]);
      if (!tapNumber || !name || /^do not erase/i.test(name)) return null;

      const kegInfo = kegWallItems.find((item) => item.tapNumber === tapNumber);
      const rawOz = toNumber(row[3]);
      const currentEquivalentRaw = clean(row[4]);
      const currentEquivalent = toNumber(row[4]);
      const averageRaw = clean(row[5]);
      const average = toNumber(row[5]);
      const history = historyColumns
        .map((column) => {
          const rawValue = clean(row[column.index]);
          return {
            label: column.label,
            value: toNumber(row[column.index]),
            hasValue: rawValue !== "",
          };
        })
        .filter((entry) => entry.hasValue);

      return {
        id: slugify(`${tapNumber}-${name}`),
        tapNumber,
        name,
        wall: kegInfo?.wall || "",
        type: kegInfo?.type || "",
        rawOz,
        currentEquivalent,
        average: averageRaw !== "" ? average : calculateAverage(history.map((entry) => entry.value)),
        history: [...(weeklyUsageHistoryOverrides[slugify(`${tapNumber}-${name}`)] || []), ...history],
        isLiquorShot: isLiquorOunceTap(tapNumber),
        displayUnit: currentEquivalentRaw !== "" ? "kegs" : "oz",
        currentDisplayValue: currentEquivalentRaw !== "" ? currentEquivalent : rawOz,
      };
    })
    .map((item) => item ? ({
      ...item,
      average: calculateAverage(item.history.map((entry) => entry.value)),
    }) : null)
    .filter(Boolean)
    .sort((a, b) => a.tapNumber - b.tapNumber);
}

function isWeeklyHistoryHeader(label) {
  const normalized = clean(label).toLowerCase();
  return Boolean(normalized)
    && normalized.includes("/")
    && normalized.includes("-")
    && !normalized.includes("avg");
}

function calculateAverage(values) {
  const numbers = values.filter((value) => Number.isFinite(value));
  return numbers.length ? sum(numbers) / numbers.length : 0;
}

function formatUsageDisplay(value, unit) {
  if (!Number.isFinite(value)) return "—";
  return `${formatNumber(value)} ${unit}`;
}

function ensureInventoryPlaceholder(items, config) {
  const id = slugify(config.name);
  if (items.some((item) => item.id === id)) return;

  const item = {
    id,
    name: config.name,
    group: config.group,
    allowsDecimal: false,
    sourceSection: config.group,
    onHandDisplay: inventoryOnHandOverrides[id] ?? "0",
    baseUnitCost: config.unitCost || 0,
    unitCost: config.unitCost || 0,
    parDisplay: inventoryParOverrides[id] ?? "0",
    note: config.note || "",
    excludeFromOrderList: false,
    excludeFromInventoryValue: Boolean(config.excludeFromInventoryValue),
  };

  recalculateInventoryItem(item);
  items.push(item);
}

function isInventorySectionRow(first, last) {
  if (first === last && first) return true;
  return ["Juices and Mixers", "Bottle Service Karaoke Cooler", "Bubbly in patio cooler"].includes(first);
}

function isInventoryHeaderRow(first) {
  return /^bottle inventory/i.test(first) || /^on hand/i.test(first);
}

function normalizeInventoryName(name) {
  const normalized = clean(name)
    .replace(/\b1\.75ml\b/i, "")
    .replace(/\b1\.75\b/i, "")
    .trim();

  return normalizeIngredientAlias(normalized);
}

function groupInventoryForDisplay(sourceItems) {
  const grouped = new Map();

  sourceItems.forEach((item) => {
    if (!grouped.has(item.group)) {
      grouped.set(item.group, []);
    }
    grouped.get(item.group).push(item);
  });

  return ["Liquor Cabinet", "Mixer Cabinet", "Other"]
    .map((groupName) => [
      groupName,
      (grouped.get(groupName) || []).sort((a, b) => getInventorySortKey(a).localeCompare(getInventorySortKey(b))),
    ])
    .filter(([, items]) => items.length);
}

function getInventoryGroup(name, sourceSection) {
  const normalized = clean(name).toLowerCase();
  if (sourceSection === "Bottle Service Karaoke Cooler") return "Bottle Service";
  if (sourceSection === "Bubbly in patio cooler") return "Bubbly";
  if (normalized === "kahlua") return "Mixer Cabinet";
  if (normalized === "sweet and sour" || normalized === "non alcoholic beer") return "Other";

  const ingredientGroup = getIngredientGroup(name);
  if (ingredientGroup === "Liquor") return "Liquor Cabinet";
  return "Mixer Cabinet";
}

function inferCategory(title) {
  const match = title.match(/\(([^)]+)\)/);
  if (match) return clean(match[1]).replace("Tequilla", "Tequila");
  if (/margarita|marg|senorita/i.test(title)) return "Tequila";
  if (/martini|cran|lemonade|palmer|blue dot/i.test(title)) return "Vodka";
  if (/whiskey|jack|old fashioned|apple jack|smash|sour|on par tee/i.test(title)) return "Whiskey";
  if (/rum|captain/i.test(title)) return "Rum";
  return "Other";
}

function getIngredientName(value, recipeTitle = "") {
  let cleanedName = clean(value)
    .replace(/^\d+(\.\d+)?\s*(gallons?|oz|cups?)\s+/i, "")
    .replace(/\s*=\s*.*$/, "")
    .replace(/\s*\([^)]*\)\s*$/g, "")
    .replace(/\b\d+(\.\d+)?\s*(bottles?|btls?|liter|liters|l|ml|oz|gallons?|cups?|diluted|pitchers|packets|water)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (/^flavored schnapps$/i.test(cleanedName)) {
    const flavor = getRecipeFlavor(recipeTitle);
    if (flavor) cleanedName = `${flavor} Schnapps`;
  }

  return normalizeIngredientAlias(cleanedName);
}

function getRecipeFlavor(recipeTitle) {
  const match = clean(recipeTitle).match(/blueberry|strawberry|raspberry|watermelon|peach/i);
  return match ? capitalize(match[0].toLowerCase()) : "";
}

function getVendorMapping(ingredientId) {
  if (PROOF_MAPPINGS[ingredientId] || OHLQ_MAPPINGS[ingredientId]) {
    return PROOF_MAPPINGS[ingredientId] || OHLQ_MAPPINGS[ingredientId] || null;
  }

  const fallbackId = slugify(normalizeIngredientAlias(clean(String(ingredientId).replace(/-/g, " "))));
  return PROOF_MAPPINGS[fallbackId] || OHLQ_MAPPINGS[fallbackId] || null;
}

function normalizeIngredientAlias(name) {
  const normalized = clean(name).toLowerCase();

  if (/^tito'?s(\s+vodka)?$/.test(normalized)) return "Tito's";
  if (/^ket(t)?le one cucumber vodka$/.test(normalized)) return "Ketel One Cucumber Vodka";
  if (/^ket(t)?le one cucumber$/.test(normalized)) return "Ketel One Cucumber Vodka";
  if (/^jose cuervo(\s+silver)?$/.test(normalized)) return "Jose Cuervo Silver";
  if (/^bull?iet$/.test(normalized) || /^bull?iet bourbon$/.test(normalized)) return "Bulleit Bourbon";
  if (/^pomegrante schnapps$/.test(normalized)) return "Pomegranate Schnapps";
  if (
    /^crown apple royal$/.test(normalized) ||
    /^crown apple$/.test(normalized) ||
    /^crown apple 6-?$/.test(normalized) ||
    /^crown royal apple$/.test(normalized) ||
    /^crown royal regal apple$/.test(normalized) ||
    /^crown apple\b/.test(normalized)
  ) return "Crown Apple";
  if (/^jack daniels fire$/.test(normalized)) return "Jack Daniel's Fire";
  if (/^jack daniels$/.test(normalized)) return "Jack Daniel's";
  if (/^svedka$/.test(normalized) || /^\d+\s+svedka blue raspberry$/.test(normalized) || /^svedka blue raspberry$/.test(normalized)) return "Svedka Blue Raspberry Vodka";
  if (/^gallon lemonade$/.test(normalized) || /^lemonade$/.test(normalized)) return "Lemonade";
  if (/pink lemonade$/.test(normalized)) return "Pink Lemonade";
  if (/strawberry lemonade$/.test(normalized)) return "Strawberry Lemonade";
  if (/^cranberry juice$/.test(normalized) || /^cranberry$/.test(normalized)) return "Cranberry Juice";
  if (/^simple syrup$/.test(normalized)) return "Simple Syrup";
  if (/^sour mix$/.test(normalized) || /^sweet and sour$/.test(normalized)) return "Sour Mix";
  if (/^blue dot juice$/.test(normalized) || /^blue dot$/.test(normalized)) return "Blue Dot Juice";
  if (/^lime juice$/.test(normalized)) return "Lime Juice";
  if (/^lemon juice$/.test(normalized)) return "Lemon Juice";
  if (/^creme de cocao$/.test(normalized)) return "Creme de Cacao";
  if (/^llords /.test(normalized)) return titleCaseIngredientName(name.replace(/^Llords/i, "Llord's"));

  return titleCaseIngredientName(name);
}

function getIngredientGroup(name) {
  const normalized = clean(name).toLowerCase();

  if (["lemonade", "pink lemonade", "cranberry juice", "sweet tea", "strawberry lemonade"].includes(normalized)) return "Buckeye Beverage";
  if (normalized === "cold brew coffee" || normalized === "sour mix" || normalized === "vanilla") return "Food Vendors";
  if (
    normalized === "triple sec" ||
    normalized === "bitters" ||
    normalized === "creme de cacao" ||
    normalized === "mint" ||
    normalized === "lime juice" ||
    normalized === "lemon juice" ||
    normalized.includes("schnapps") ||
    normalized.includes("pucker")
  ) {
    return "Proof";
  }
  if (normalized === "blue dot juice") return "Made In House";
  if (normalized === "simple syrup" || normalized.includes("syrup")) return "Made In House";
  if (
    normalized.includes("juice") ||
    normalized.includes("mix") ||
    normalized.includes("blue dot")
  ) return "Other";
  if (
    normalized.includes("vodka") ||
    normalized === "tito's" ||
    normalized.includes("gin") ||
    normalized.includes("rum") ||
    normalized.includes("tequila") ||
    normalized.includes("whiskey") ||
    normalized.includes("bourbon") ||
    normalized.includes("crown apple") ||
    normalized.includes("crown royal") ||
    normalized.includes("jose cuervo") ||
    normalized.includes("bombay") ||
    normalized.includes("captain morgan") ||
    normalized.includes("jim beam") ||
    normalized.includes("absolut citron") ||
    normalized.includes("svedka") ||
    normalized.includes("bulleit") ||
    normalized.includes("jack daniel") ||
    normalized === "kahlua"
  ) {
    return "Liquor";
  }

  return "Other";
}

function getIngredientSortKey(ingredient) {
  const normalized = clean(ingredient.name).toLowerCase();
  if (normalized === "kahlua") return "zzzz-kahlua";
  if (normalized === "simple syrup") return "zzzz-simple-syrup";
  return normalized;
}

function getInventorySortKey(item) {
  const cabinetIndex = INVENTORY_CABINET_ORDER.indexOf(item.name);
  if (cabinetIndex >= 0) return `${String(cabinetIndex).padStart(3, "0")}-${item.name.toLowerCase()}`;
  return `zzz-${item.name.toLowerCase()}`;
}

function titleCaseIngredientName(name) {
  return clean(name).replace(/\b([a-z])([a-z']*)/gi, (_, first, rest) => `${first.toUpperCase()}${rest.toLowerCase()}`);
}

function bindIngredientSummaryEvents() {
  const scopeSelect = document.querySelector("#vendor-sync-scope");
  const runSyncButton = document.querySelector("#run-vendor-sync");

  if (!scopeSelect || !runSyncButton) return;

  scopeSelect.addEventListener("change", () => {
    vendorSyncScope = scopeSelect.value;
  });

  runSyncButton.addEventListener("click", () => {
    vendorSyncScope = scopeSelect.value;
    runVendorSync();
  });
}

function getVendorMappedIngredients(scope = "all") {
  return ingredients
    .filter((ingredient) => ingredient.id !== "water" && ingredient.vendorProduct)
    .filter((ingredient) => scope === "all" || getVendorSyncName(ingredient.vendorProduct) === scope)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getVendorSyncName(vendorProduct) {
  return vendorProduct?.syncVendor || vendorProduct?.vendor || "";
}

async function runVendorSync() {
  const candidates = getVendorMappedIngredients(vendorSyncScope);
  if (!candidates.length) {
    vendorSyncMessage = "No mapped ingredients match that vendor scope yet.";
    renderIngredientSummary();
    return;
  }

  vendorSyncRunning = true;
  vendorSyncMessage = `Checking ${vendorSyncScope === "all" ? "all mapped vendors" : vendorSyncScope}...`;
  renderIngredientSummary();

  try {
    const response = await fetch("/api/vendor-sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scope: vendorSyncScope,
        items: candidates.map((ingredient) => ({
          id: ingredient.id,
          name: ingredient.name,
          vendorProduct: ingredient.vendorProduct,
          syncVendor: getVendorSyncName(ingredient.vendorProduct),
        })),
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error || "Vendor sync failed.");
    }

    let applied = 0;
    (result.updates || []).forEach((update) => {
      if (!update.id || !Number.isFinite(update.bottleOz) || !Number.isFinite(update.bottlePrice)) return;
      const existingOverride = priceOverrides[update.id] || {};
      const previousBottlePrice = toNumber(existingOverride.bottlePrice);
      const nextBottlePrice = Number(update.bottlePrice);
      const didPriceChange = previousBottlePrice > 0 && Math.abs(previousBottlePrice - nextBottlePrice) > 0.001;
      priceOverrides[update.id] = {
        ...existingOverride,
        bottleOz: String(update.bottleOz),
        bottlePrice: String(update.bottlePrice),
        updatedAt: update.updatedAt || new Date().toISOString(),
        previousBottlePrice: didPriceChange ? String(previousBottlePrice) : "",
        previousUpdatedAt: didPriceChange ? existingOverride.updatedAt || "" : "",
      };
      applied += 1;
    });

    if (applied) {
      saveOverrides();
    }

    const statusNotes = (result.vendorStatuses || [])
      .map((status) => `${status.vendor}: ${status.message}`)
      .join(" ");

    vendorSyncMessage = `Applied ${applied} price${applied === 1 ? "" : "s"}.${statusNotes ? ` ${statusNotes}` : ""}`;
    render();
  } catch (error) {
    vendorSyncMessage = error.message || "Vendor sync failed.";
    renderIngredientSummary();
  } finally {
    vendorSyncRunning = false;
    renderIngredientSummary();
  }
}

function getIngredientAddAmount(rawValue) {
  const raw = clean(rawValue);
  if (!raw) return "";

  if (raw.includes("=")) {
    const afterEquals = clean(raw.split("=").slice(1).join("="));
    return afterEquals.replace(/\s*=\s*.*$/, "").trim();
  }

  const leadingMatch = raw.match(/^(\d+(?:\.\d+)?)\s*(gallons?|oz|cups?|packets?|pitchers?)\b/i);
  if (leadingMatch) {
    return clean(leadingMatch[0]);
  }

  const shorthandBottleMatch = raw.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(l|ml)\b/i);
  if (shorthandBottleMatch) {
    const [, count, size, unit] = shorthandBottleMatch;
    return `${formatInventoryQuantity(count)} bottles (${formatContainerSizeLabel(size, unit)})`;
  }

  const quantityMatch = raw.match(/(\d+(?:\.\d+)?)\s*(bottles?|btls?|gallons?|oz|cups?|packets?|pitchers?)(.*)$/i);
  if (quantityMatch) {
    return clean(quantityMatch[0]);
  }

  return "";
}

function getRecipeCardAddAmount(ingredient) {
  const normalizedName = normalizeIngredientAlias(ingredient?.name || "");
  const rawValue = clean(ingredient?.raw);
  const gallonDisplayName = getRecipeCardGallonDisplayName(normalizedName, rawValue);

  const explicitGallonMatch = rawValue.match(/(\d+(?:\.\d+)?)\s*gallons?/i);
  if (explicitGallonMatch && gallonDisplayName) {
    const gallons = toNumber(explicitGallonMatch[1]);
    if (gallons > 0) {
      return `${formatNumber(gallons)} ${gallons === 1 ? "gallon" : "gallons"}`;
    }
  }

  if (gallonDisplayName && ingredient?.oz) {
    const gallons = ingredient.oz / 128;
    if (Number.isFinite(gallons) && gallons > 0) {
      return `${formatNumber(gallons)} ${gallons === 1 ? "gallon" : "gallons"}`;
    }
  }

  const baseAmount = getIngredientAddAmount(ingredient?.raw);
  if (!baseAmount) return "";
  if (/\(([^)]+)\)/.test(baseAmount)) return baseAmount;

  const packageSizeLabel = getRecipeCardPackageSizeLabel(ingredient);
  if (!packageSizeLabel) return baseAmount;
  if (!/\bbottles?\b/i.test(baseAmount)) return baseAmount;

  return `${baseAmount} (${packageSizeLabel})`;
}

function getRecipeCardGallonDisplayName(normalizedName, rawValue) {
  const normalizedRaw = clean(rawValue).toLowerCase();
  const gallonDisplayNames = new Set(["cranberry juice", "lemonade", "strawberry lemonade", "simple syrup", "sour mix", "blue dot juice"]);
  if (gallonDisplayNames.has(normalizedName)) return normalizedName;
  if (normalizedRaw.includes("strawberry lemonade")) return "strawberry lemonade";
  if (normalizedRaw.includes("gallon lemonade") || /\blemonade\b/.test(normalizedRaw)) return "lemonade";
  if (normalizedRaw.includes("cranberry")) return "cranberry juice";
  if (normalizedRaw.includes("simple syrup")) return "simple syrup";
  if (normalizedRaw.includes("sour mix") || normalizedRaw.includes("sweet and sour")) return "sour mix";
  if (normalizedRaw.includes("blue dot juice") || normalizedRaw.includes("blue dot")) return "blue dot juice";
  return "";
}

function getRecipeCardPackageSizeLabel(ingredient) {
  const explicitSizeOz = toNumber(ingredient?.packageSizeOz);
  if (explicitSizeOz) return formatPackageSizeFromOz(explicitSizeOz);

  const resolvedId = getResolvedIngredientId(ingredient);
  const overrideBottleOz = toNumber(priceOverrides[resolvedId]?.bottleOz);
  if (overrideBottleOz) return formatPackageSizeFromOz(overrideBottleOz);

  const mappedBottleOz = toNumber(getVendorMapping(resolvedId)?.bottleOz);
  if (mappedBottleOz) return formatPackageSizeFromOz(mappedBottleOz);

  return "";
}

function formatPackageSizeFromOz(sizeOz) {
  if (!sizeOz) return "";

  const roundedMl = Math.round(sizeOz * 29.5735);
  const literSizes = [
    { ml: 1750, label: "1.75L" },
    { ml: 1000, label: "1L" },
    { ml: 750, label: "750mL" },
    { ml: 375, label: "375mL" },
  ];

  const literMatch = literSizes.find((item) => Math.abs(roundedMl - item.ml) <= 20);
  if (literMatch) return literMatch.label;

  if (Math.abs(sizeOz - 16) <= 0.2) return "16oz";
  if (Math.abs(sizeOz - 128) <= 1) return "1 gallon";

  return `${formatNumber(sizeOz)} oz`;
}

function isMetricLabel(value) {
  return /^(total price|total oz|total price per oz|price we're charging|profit per oz|profit margin|cost for|how many oz per shot)/i.test(value);
}

function getMetricNumber(metrics, label) {
  const metric = metrics.find((item) => item.label.toLowerCase().startsWith(label.toLowerCase()));
  return toNumber(metric?.value);
}

function loadOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveOverrides() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(priceOverrides));
}

function loadKegPriceOverrides() {
  try {
    return JSON.parse(localStorage.getItem(KEG_PRICE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveKegPriceOverrides() {
  localStorage.setItem(KEG_PRICE_STORAGE_KEY, JSON.stringify(kegPriceOverrides));
}

function loadChargeOverrides() {
  try {
    return JSON.parse(localStorage.getItem(CHARGE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveChargeOverrides() {
  localStorage.setItem(CHARGE_STORAGE_KEY, JSON.stringify(chargeOverrides));
}

function loadCustomRecipes() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_RECIPE_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCustomRecipes() {
  localStorage.setItem(CUSTOM_RECIPE_STORAGE_KEY, JSON.stringify(customRecipes));
}

function loadInactiveRecipeIds() {
  try {
    return JSON.parse(localStorage.getItem(INACTIVE_RECIPE_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveInactiveRecipeIds() {
  localStorage.setItem(INACTIVE_RECIPE_STORAGE_KEY, JSON.stringify(inactiveRecipeIds));
}

function loadEditedRecipes() {
  try {
    return JSON.parse(localStorage.getItem(EDITED_RECIPE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveEditedRecipes() {
  localStorage.setItem(EDITED_RECIPE_STORAGE_KEY, JSON.stringify(editedRecipes));
}

function loadInventoryOnHandOverrides() {
  try {
    return JSON.parse(localStorage.getItem(INVENTORY_ON_HAND_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveInventoryOnHandOverrides() {
  localStorage.setItem(INVENTORY_ON_HAND_STORAGE_KEY, JSON.stringify(inventoryOnHandOverrides));
}

function loadInventoryParOverrides() {
  try {
    return JSON.parse(localStorage.getItem(INVENTORY_PAR_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveInventoryParOverrides() {
  localStorage.setItem(INVENTORY_PAR_STORAGE_KEY, JSON.stringify(inventoryParOverrides));
}

function loadInventoryHistory() {
  try {
    return JSON.parse(localStorage.getItem(INVENTORY_HISTORY_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function loadWeeklyUsageCurrentOverrides() {
  try {
    return JSON.parse(localStorage.getItem(WEEKLY_USAGE_CURRENT_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveWeeklyUsageCurrentOverrides() {
  localStorage.setItem(WEEKLY_USAGE_CURRENT_STORAGE_KEY, JSON.stringify(weeklyUsageCurrentOverrides));
}

function loadWeeklyUsageHistoryOverrides() {
  try {
    return JSON.parse(localStorage.getItem(WEEKLY_USAGE_HISTORY_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveWeeklyUsageHistoryOverrides() {
  localStorage.setItem(WEEKLY_USAGE_HISTORY_STORAGE_KEY, JSON.stringify(weeklyUsageHistoryOverrides));
}

function loadKegOnHandOverrides() {
  try {
    return JSON.parse(localStorage.getItem(KEG_ON_HAND_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveKegOnHandOverrides() {
  localStorage.setItem(KEG_ON_HAND_STORAGE_KEY, JSON.stringify(kegOnHandOverrides));
}

function loadKegParOverrides() {
  try {
    return JSON.parse(localStorage.getItem(KEG_PAR_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveKegParOverrides() {
  localStorage.setItem(KEG_PAR_STORAGE_KEY, JSON.stringify(kegParOverrides));
}

function saveInventoryHistory() {
  localStorage.setItem(INVENTORY_HISTORY_STORAGE_KEY, JSON.stringify(inventoryHistory));
}

function clean(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeTitle(value) {
  return clean(value).toLowerCase();
}

function toNumber(value) {
  const cleaned = String(value ?? "").replace(/[$,%\s]/g, "").replace(/,/g, "");
  const number = Number.parseFloat(cleaned);
  return Number.isFinite(number) ? number : 0;
}

function sum(values) {
  return values.reduce((total, value) => total + (Number.isFinite(value) ? value : 0), 0);
}

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatInventoryQuantity(value) {
  const number = Number.parseFloat(String(value ?? "").replace(/,/g, ""));
  if (Number.isFinite(number)) return formatNumber(number);
  return value || "-";
}

function formatContainerSizeLabel(size, unit) {
  const cleanedUnit = clean(unit).toLowerCase();
  if (cleanedUnit === "l") return `${formatNumber(size)}L`;
  if (cleanedUnit === "ml") return `${formatNumber(size)}mL`;
  return `${formatNumber(size)} ${unit}`;
}

function formatUpdatedAt(value) {
  if (!value) return "Not updated";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not updated";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getPreviousPriceNote(override) {
  const currentPrice = toNumber(override?.bottlePrice) || toNumber(override?.kegPrice);
  const previousPrice = toNumber(override?.previousBottlePrice) || toNumber(override?.previousKegPrice);
  if (!currentPrice || !previousPrice) return "";
  if (Math.abs(currentPrice - previousPrice) <= 0.001) return "";

  const previousDate = override?.previousUpdatedAt ? formatUpdatedAt(override.previousUpdatedAt) : "";
  return previousDate ? `Was ${money(previousPrice)} before ${previousDate}` : `Was ${money(previousPrice)}`;
}

function formatInventorySnapshotLabel(value) {
  if (!value) return "Saved snapshot";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Saved snapshot";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatBatchLabel(value) {
  const cleaned = clean(value);
  if (!cleaned) return DEFAULT_BATCH_LABEL;
  if (/^12\s*gallons?$/i.test(cleaned) || /^12\s*gallon\s*keg$/i.test(cleaned)) return DEFAULT_BATCH_LABEL;
  return cleaned;
}

function slugify(value) {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function capitalize(value) {
  return value ? value[0].toUpperCase() + value.slice(1) : "";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
