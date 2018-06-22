import React from "react";
import ReactDOM from "react-dom";
import {
  PanelGroup,
  Panel,
  Button,
  ButtonToolbar,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { AddRecipe } from "./components/AddRecipe";
import { EditRecipe } from "./components/EditRecipe";
import "./css/index.css";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          name: "Banana Smoothie",
          ingredients: [
            "2 bananas",
            "1/2 cup vanilla yogurt",
            "1/2 cup skim milk",
            "2 teaspoons honey",
            "pinch of cinnamon"
          ]
        },
        {
          name: "Spaghetti",
          ingredients: ["Noodles", "Tomato Sauce", "Meatballs"]
        },
        {
          name: "Split Pea Soup",
          ingredients: [
            "1 pound split peas",
            "1 onion",
            "6 carrots",
            "4 ounces of ham"
          ]
        }
      ],
      showAdd: false,
      showEdit: false,
      currentlyEditing: 0
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  showAddModal() {
    this.setState({ showAdd: !this.state.showAdd });
  }
  showEditModal(index) {
    this.setState({ showEdit: !this.state.showEdit, currentlyEditing: index });
  }
  addRecipe(recipe) {
    let recipes = this.state.recipes;
    recipes.push(recipe);
    this.setState({ recipes: recipes });
    this.showAddModal();
  }
  editRecipe(newName, newIngredients, currentlyEditing) {
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = { name: newName, ingredients: newIngredients };
    this.setState({ recipes: recipes });
    this.showEditModal(currentlyEditing);
  }
  deleteRecipe(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    this.setState({ recipes: recipes, currentlyEditing: 0 });
  }
  render() {
    const recipes = this.state.recipes;
    return (
      <div className="jumbotron">
        <h1>RECIPE BOX</h1>
        <PanelGroup accordion id="recipes">
          {recipes.map((recipe, index) => (
            <Panel eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title className="title" toggle>
                  {recipe.name}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ListGroup>
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                  ))}
                </ListGroup>
                <ButtonToolbar>
                  <Button
                    bsStyle="warning"
                    onClick={() => {
                      this.showEditModal(index);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    bsStyle="danger"
                    onClick={() => {
                      this.deleteRecipe(index);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonToolbar>
              </Panel.Body>
              <EditRecipe
                onShow={this.state.showEdit}
                onEdit={this.editRecipe}
                onEditModal={() => {
                  this.showEditModal(this.state.currentlyEditing);
                }}
                currentlyEditing={this.state.currentlyEditing}
                recipe={recipes[this.state.currentlyEditing]}
              />
            </Panel>
          ))}
        </PanelGroup>
        <Button bsStyle="primary" onClick={this.showAddModal}>
          Add Recipe
        </Button>
        <AddRecipe
          onShow={this.state.showAdd}
          onAdd={this.addRecipe}
          onAddModal={this.showAddModal}
        />
      </div>
    );
  }
}
ReactDOM.render(<Recipe />, document.getElementById("app"));
