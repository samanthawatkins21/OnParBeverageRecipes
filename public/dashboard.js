const CSV_PATH = "./data/cocktail-recipes.csv";
const NEW_COCKTAILS_CSV_PATH = "./data/new-cocktails.csv";
const STORAGE_KEY = "cocktail-dashboard-ingredient-prices";
const CHARGE_STORAGE_KEY = "cocktail-dashboard-charge-prices";
const CUSTOM_RECIPE_STORAGE_KEY = "cocktail-dashboard-custom-recipes";
const INACTIVE_RECIPE_STORAGE_KEY = "cocktail-dashboard-inactive-recipes";
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
const ingredientSummary = document.querySelector("#ingredient-summary");
const clearPricesButton = document.querySelector("#clear-prices");
const clearChargesButton = document.querySelector("#clear-charges");
const recipeForm = document.querySelector("#recipe-form");
const addIngredientRowButton = document.querySelector("#add-ingredient-row");
const newIngredientRows = document.querySelector("#new-ingredient-rows");
const cardTemplate = document.querySelector("#recipe-card-template");

let recipes = [];
let ingredients = [];
let priceOverrides = loadOverrides();
let chargeOverrides = loadChargeOverrides();
let customRecipes = loadCustomRecipes();
let inactiveRecipeIds = loadInactiveRecipeIds();

init();

async function init() {
  const [csv, newCocktailsCsv] = await Promise.all([
    fetchCsv(CSV_PATH),
    fetchCsv(NEW_COCKTAILS_CSV_PATH),
  ]);

  recipes = [
    ...applyMenuOrder(parseRecipes(parseCsv(csv))),
    ...applyRecipeOrder(parseRecipes(parseCsv(newCocktailsCsv)), NEW_RECIPE_ORDER),
    ...customRecipes,
  ];
  ingredients = buildIngredientCatalog(getActiveRecipes());
  hydrateCategoryFilter(recipes);
  bindEvents();
  addIngredientRow();
  addIngredientRow();
  addIngredientRow();
  render();
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
  recipeForm.addEventListener("submit", addCustomRecipe);
  addIngredientRowButton.addEventListener("click", addIngredientRow);
  clearPricesButton.addEventListener("click", () => {
    priceOverrides = {};
    saveOverrides();
    render();
  });
  clearChargesButton.addEventListener("click", () => {
    chargeOverrides = {};
    saveChargeOverrides();
    render();
  });
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
  renderStats();
  renderRecipes();
  renderPricing();
  renderIngredients();
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
  card.querySelector(".recipe-card__batch").textContent = recipe.batch || "Batch size not listed";
  card.querySelector(".spirit-pill").textContent = recipe.category;
  const actions = card.querySelector(".recipe-card__actions");
  actions.innerHTML = `
    <button class="mini-button" data-action="toggle" type="button">${state === "active" ? "Deactivate" : "Reactivate"}</button>
    ${state === "inactive" && recipe.isCustom ? '<button class="mini-button mini-button--danger" data-action="delete" type="button">Delete custom</button>' : ""}
  `;
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
    ["Profit margin", `${formatNumber(pricing.margin)}%`],
  ]
    .map(([label, value]) => `<div class="recipe-number"><strong>${value}</strong><span>${label}</span></div>`)
    .join("");

  const tbody = card.querySelector("tbody");
  recipe.ingredients.forEach((ingredient) => {
    const liveCost = getIngredientCost(ingredient);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(ingredient.name)}</td>
      <td class="${liveCost.source === "override" ? "updated-cost" : ""}">${money(liveCost.cost)}</td>
      <td>${formatNumber(ingredient.oz)}</td>
    `;
    tbody.append(row);
  });

  getCalculatedMetrics(recipe, totals, pricing).forEach((metric) => {
    const row = document.createElement("tr");
    row.className = "muted";
    row.innerHTML = `
      <td>${escapeHtml(metric.label)}</td>
      <td>${metric.value}</td>
      <td></td>
    `;
    tbody.append(row);
  });

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
      <td><strong>${escapeHtml(recipe.title)}</strong><span class="table-note">${escapeHtml(recipe.batch || "")}</span></td>
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
    const haystack = `${ingredient.name} ${ingredient.recipes.join(" ")}`.toLowerCase();
    return haystack.includes(searchTerm);
  });

  renderIngredientSummary();
  ingredientTable.innerHTML = "";
  visibleIngredients.forEach((ingredient) => {
    const override = priceOverrides[ingredient.id] || {};
    const currentUnitCost = getCatalogUnitCost(ingredient);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${escapeHtml(ingredient.name)}</strong></td>
      <td class="muted">${escapeHtml(ingredient.recipes.slice(0, 3).join(", "))}${ingredient.recipes.length > 3 ? ` +${ingredient.recipes.length - 3}` : ""}</td>
      <td>${money(currentUnitCost)}</td>
      <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override.bottleOz ?? "")}" aria-label="Bottle ounces for ${escapeHtml(ingredient.name)}"></td>
      <td><input type="text" inputmode="decimal" pattern="[0-9]*[.]?[0-9]*" value="${escapeHtml(override.bottlePrice ?? "")}" aria-label="Bottle price for ${escapeHtml(ingredient.name)}"></td>
    `;

    const [bottleOzInput, bottlePriceInput] = row.querySelectorAll("input");
    bottleOzInput.addEventListener("input", () => setOverride(ingredient.id, "bottleOz", bottleOzInput.value));
    bottlePriceInput.addEventListener("input", () => setOverride(ingredient.id, "bottlePrice", bottlePriceInput.value));
    ingredientTable.append(row);
  });
}

function renderIngredientSummary() {
  ingredientSummary.innerHTML = `
    <h2>Ingredient pricing</h2>
    <div class="summary-line"><span>Unique ingredients</span><strong>${ingredients.length}</strong></div>
    <div class="summary-line"><span>With bottle overrides</span><strong>${countOverrides()}</strong></div>
    <div class="summary-line"><span>Total ounces tracked</span><strong>${formatNumber(sum(ingredients.map((item) => item.totalOz)))}</strong></div>
    <div class="summary-line"><span>Estimated catalog cost</span><strong>${money(sum(ingredients.map((item) => getCatalogCost(item))))}</strong></div>
  `;
}

function setOverride(id, field, value) {
  priceOverrides[id] = { ...(priceOverrides[id] || {}), [field]: value };
  if (!priceOverrides[id].bottleOz && !priceOverrides[id].bottlePrice) {
    delete priceOverrides[id];
  }
  saveOverrides();
  renderStats();
  renderRecipes();
  renderPricing();
  renderIngredientSummary();
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
    const [nameInput, costInput, ozInput] = row.querySelectorAll("input");
    const name = clean(nameInput.value);
    return {
      id: slugify(name),
      raw: name,
      name,
      cost: toNumber(costInput.value),
      oz: toNumber(ozInput.value),
    };
  }).filter((ingredient) => ingredient.name);

  const recipe = {
    id: `custom-${Date.now()}-${slugify(title)}`,
    title,
    batch: clean(document.querySelector("#new-recipe-batch").value),
    category: clean(document.querySelector("#new-recipe-category").value) || "Other",
    defaultChargePerOz: toNumber(document.querySelector("#new-recipe-charge").value),
    ingredients: ingredientsForRecipe,
    metrics: [],
    isCustom: true,
  };

  customRecipes.push(recipe);
  recipes.push(recipe);
  saveCustomRecipes();
  recipeForm.reset();
  newIngredientRows.innerHTML = "";
  addIngredientRow();
  addIngredientRow();
  addIngredientRow();
  switchTab("recipes");
  render();
}

function addIngredientRow() {
  const row = document.createElement("tr");
  const isFirstRow = newIngredientRows.children.length === 0;
  if (isFirstRow) row.classList.add("primary-liquor-row");
  row.innerHTML = `
    <td>
      ${isFirstRow ? '<span class="row-badge">Liquor row</span>' : ""}
      <input type="text" placeholder="${isFirstRow ? "Liquor / primary alcohol" : "Ingredient name"}" aria-label="${isFirstRow ? "New recipe primary liquor" : "New recipe ingredient"}">
    </td>
    <td><input type="text" inputmode="decimal" placeholder="0.00" aria-label="New recipe ingredient cost"></td>
    <td><input type="text" inputmode="decimal" placeholder="0" aria-label="New recipe ingredient ounces"></td>
    <td><button class="icon-button" type="button" aria-label="Remove ingredient row">x</button></td>
  `;
  row.querySelector("button").addEventListener("click", () => row.remove());
  newIngredientRows.append(row);
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
      ingredients: source.ingredients.map((ingredient) => ({ ...ingredient })),
      metrics: source.metrics.map((metric) => ({ ...metric })),
    };
  }).filter(Boolean);
}

async function fetchCsv(path) {
  const response = await fetch(path);
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
        id: slugify(extractIngredientName(label)),
        raw: label,
        name: extractIngredientName(label),
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
  return {
    cost,
    oz,
    costPerOz: oz ? cost / oz : 0,
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
    { label: "Total price per oz", value: money(totals.costPerOz) },
    { label: "Price we're charging", value: money(pricing.chargePerOz) },
    { label: "Profit per oz", value: money(pricing.profitPerOz) },
    { label: "Profit margin", value: `${formatNumber(pricing.margin)}%` },
    { label: "Oz pour for 1.5 oz alcohol", value: pricing.pourOz ? formatNumber(pricing.pourOz) : "-" },
    { label: "Charge per pour", value: pricing.pourOz ? money(pricing.chargePerPour) : "-" },
  ];
}

function getIngredientCost(ingredient) {
  const override = priceOverrides[ingredient.id];
  const bottleOz = toNumber(override?.bottleOz);
  const bottlePrice = toNumber(override?.bottlePrice);

  if (bottleOz && bottlePrice && ingredient.oz) {
    return {
      cost: ingredient.oz * (bottlePrice / bottleOz),
      source: "override",
    };
  }

  return {
    cost: ingredient.cost || 0,
    source: "sheet",
  };
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

function countOverrides() {
  return Object.keys(priceOverrides).filter((key) => {
    const override = priceOverrides[key];
    return toNumber(override?.bottleOz) && toNumber(override?.bottlePrice);
  }).length;
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

function inferCategory(title) {
  const match = title.match(/\(([^)]+)\)/);
  if (match) return clean(match[1]).replace("Tequilla", "Tequila");
  if (/margarita|marg|senorita/i.test(title)) return "Tequila";
  if (/martini|cran|lemonade|palmer|blue dot/i.test(title)) return "Vodka";
  if (/whiskey|jack|old fashioned|apple jack|smash|sour/i.test(title)) return "Whiskey";
  if (/rum|captain/i.test(title)) return "Rum";
  return "Other";
}

function extractIngredientName(value) {
  return clean(value)
    .replace(/^\d+(\.\d+)?\s*(gallons?|oz|cups?)\s+/i, "")
    .replace(/\s*=\s*.*$/, "")
    .replace(/\s*\([^)]*\)\s*$/g, "")
    .replace(/\b\d+(\.\d+)?\s*(bottles?|btls?|liter|liters|l|ml|oz|gallons?|cups?|diluted|pitchers|packets|water)\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
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

function slugify(value) {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
