import { useEffect, useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const test = FirebaseFirestoreService.readDocuments({
    collectionName: "vehicles",
    queries: [],
  });
  const colors = [ 'super-black', 'glacier-white', ];
  const markets = ['canada'];
  const features = {
    'en-ca': [
    '2.5-litre DOHC 16-valve Direct Injection Gasoline™ (DIG) 4-cylinder engine',
    '17" Aluminum-alloy wheels',
    'NissanConnect® 8" color touch-screen display',
    'Heated front seats',
    'Heated steering wheel',
  ]};

  const mechanical = [
    { 
      name: 'engine',
      description: '2.5 L DOHC 16-valve Direct Injection Gasoline™ (DIG) 4-cylinder engine',
      translations: [
        {'en-ca': '2.5 L DOHC 16-valve Direct Injection Gasoline™ (DIG) 4-cylinder engine'},
        {'fr-ca': ''}
      ]
    },
    { 
      name: 'horsepower',
      description: 'Horsepower - 181 hp @ 6,000 rpm',
      translations: [
        {'en-ca': 'Horsepower - 181 hp @ 6,000 rpm'},
        {'fr-ca': ''}
    ]
      
    },
    { 
      name: 'torque',
      description: 'Torque - 181 lb-ft @ 3,600 rpm',
      translations: [
        {'en-ca': 'Torque - 181 lb-ft @ 3,600 rpm'},
        {'fr-ca': ''}
      ]
    },
  ]

  const driver_asistance = [
    { name: 'brakeAssist',
      description: 'Intelligent Brake Assist [*]',
      translations: [
        {'en-ca': 'Intelligent Brake Assist [*]'},
        {'fr-ca': ''}
      ]
    },
    {
      name: 'cruiseControl',
      description: 'Cruise Control',
      translations: [
        {'en-ca': 'Cruise Control'},
        {'fr-ca': ''}
      ]
    }
  ]


  const exterior =  [
    {
      name: 'wheels',
      description: '17" aluminum-alloy wheels',
      translations: [
        {'en-ca': '17" aluminum-alloy wheels'},
        {'fr-ca': ''}
      ] 
    },
    {
      name: 'tires',
      description: 'P235/65R17 all-season tires',
      translations: [
        {'en-ca': 'P235/65R17 all-season tires'},
        {'fr-ca': ''}
      ]
    }
  ]

  const interior =  [
    {
      name: 'seats',
      description: 'Cloth seat trim',
      translations: [
        {'en-ca': 'Cloth seat trim'},
        {'fr-ca': ''}
      ]}
  ];

  const audio = [
    {
      name: 'display',
      description: 'Advanced Drive-Assist™ Display [*]',
      translations: [
        {'en-ca': 'Advanced Drive-Assist™ Display [*]'},
        {'fr-ca': ''}
      ]}
  ]


  const variant = {
    name: 'S',
    version: 'AWD',
    features,
    mechanical,
    driver_asistance,
    exterior,
    interior,
    audio,
  }

  const car = {
      description: 'description',
      label: 'Armada',
      model: '2023 Armada®',
      name: 'armada',
      price: '$71,798',
      space: '2,701 L',
      type: 'crossovers',
      year: '2023',
      colors,
      markets,
      variants: [variant]
  }
  
  //FirebaseFirestoreService.createDocument('vehicles', car);


  /*useEffect(()=> {
    fetchRecipes()
    .then((fetchedRecipes) => {
      setRecipes(fetchedRecipes);
    })
    .catch((error) => {
      console.error(error.message);

      throw error;
    })
  }, [user]);*/

  async function fetchRecipes() {
    const queries = [];

    if (!user) {
      queries.push({
        field: 'isPublished',
        condition: '==',
        value: true,
      });
    }

    let fetchedRecipes = [];

    try {
      const response = await FirebaseFirestoreService.readDocuments({
        collectionName: "recipes",
        queries: queries,
      });
      console.log('response', response);
      console.log('docs', response.docs);
      console.log('docs data', response.docs[0].data());
      const newRecipes = response.docs.map((recipeDoc)=> {
        const id = recipeDoc.id;
        const data = recipeDoc.data();
        data.publishDate = new Date(data.publishDate.seconds * 1000);

        return {...data, id }
      });

      fetchedRecipes = [...newRecipes];
    } catch (error) {
      console.error(error.message);
      throw error;
    }

    return fetchedRecipes;
  }

  async function handleFetchRecipes() {
    try {
      const fetchedRecipes = await fetchRecipes();

      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
  

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  async function handleAddRecipe(newRecipe) {
    try {
      const response = await FirebaseFirestoreService.createDocument('recipes', newRecipe);

      handleFetchRecipes();

      alert(`success document created with ID ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  }

  function lookupCategoryLabel(categoryKey) {
    const categories = {
      breadsSandwichesAndPizza: 'Breads, Sandwiches, and Pizza',
      eggsAndBreakfast: 'Eggs & Breakfast',
      dessertsAndBakedGoods: 'Desserts & Baked Goods',
      fishAndSeafood: 'Fish & Seafood',
      vegetables: 'Vegetables',
    };

    const label = categories[categoryKey];

    return label;
  }

  function formatDate(date) {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getFullYear();
    const dateString = `${month}-${day}-${year}`;

    return dateString;
  }
  
  return (
    <div className="App">
      <div className='title-row'>
        <h1 className='title'>Firebase Recipes</h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>      
      <div className="main">
        <div className="center">
          <div className="recipe-list-box">
            {
              recipes && recipes.length > 0 ? (
                <div className="recipe-list">
                  {
                    recipes.map((recipe) => {
                      return (
                        <div className="recipe-card" key={recipe.id}>
                          {
                            recipe.isPublished === false ? (
                              <div className="unpublished">UNPUBLISHED</div>
                              ) : null
                            }
                          <div className="recipe-name">{recipe.name}</div>
                          <div className="recipe-field">Category: {lookupCategoryLabel(recipe.category) }</div>
                          <div className="recipe-field">Publish Date: {formatDate(recipe.publishDate)}</div>
                        </div>
                      )
                    })
                  }
                </div>
              ) : null
            }
          </div>
        </div>
        {
          user ? <AddEditRecipeForm handleAddRecipe={handleAddRecipe}></AddEditRecipeForm> : null
        }
      </div>
          
    </div>
  );
}

export default App;
