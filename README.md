# Wafo-forms
UI Component made in React 16.8 and with one purpose in mind: To make my and my co-workers life easier.

## Demo
**To-do**: Demo page and examples.

## First steps

    $ npm install --save wafo-forms

**To-do:** Small description

### Dependencies
This component has one dependency *[prop-types](https://www.npmjs.com/package/prop-types)* (besides *react* and *react-dom*).

> **Note:** The component is designed to be used with *[Bootstrap](https://getbootstrap.com/)* and although it is not required, it can benefit from it being included.

### Use example
This example shows one of the easiest way this component can be used. For more specific use cases, keep scrolling.

```javascript
import React from 'react';
import { WafoForm, WafoFormInput } from 'wafo-forms';

const ExampleComponent = () => {
	const handleSubmit = (values) => {
		// Do something with the values...
	};
	
	return (
		<WafoForm buttonText="Submit" onSubmit={handleSubmit}>
			<WafoFormInput
				type="text"
				name="example"
				customClass="custom-class"
				placeholder="A placeholder"
				label="An input field"
			/>
		</WafoForm>
	);
};
```

## Components
Besides the main component [`WafoForm`](#wafoform), there are other components, the input components. The recomended way to use this components it is inside of the main component, however, it is posible to use them individually.

> **Note:** Using components outside of `WafoForm` is not recommended as most of the functionality is lost. In these cases it is recommended to use the default components. More information on forms in React [here](https://reactjs.org/docs/forms.html).

### WafoForm Element
This is not really a component, but with the intention of explaining how the components work and the functionality of the library, we will refer to any `Component` that can be a child of [`WafoForm`](#wafoform) as a `WafoForm Element`. Most of the components included share a large part of their properties.

Besides the included components, you can create your own custom `Components` that work within [`WafoForm`](#wafoform), having a couple of considerations in mind. More information on this in [`Custom components`](#componentes-personalizados).

### WafoForm
El componente principal, es el equivalente a la etiqueta [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) de *HTML*. Es quien se encarga de manejar el *state*, *validaciones* y entregar los *valores* al momento de hacer el *submit*.

Ejemplo:
```javascript
import React from 'react';
import { WafoForm } from 'wafo-forms';

const Example = ({ handleFormSubmit }) => (
	<WafoForm
		buttonText="Submit"
		onSubmit={handleFormSubmit}
	>
		{/* Componentes hijos aqui... */}
	</WafoForm>
);
```

#### Props
| Prop | Type | Required | Default value | Description |
|--|--|--|--|--|
| buttonText | String | No | "" | Texto que se mostrara en el botón *submit* de la forma. Si se omite, el botón no será mostrado. |
| onSubmit | Function | No | f => f | Función (callback) que se dispara al hacer submit. Recibe como prop un objeto tipo [`formValue`](#objeto-formvalue). |
| values | [Object](#objeto-values-y-edición-en-wafoform) | No | *undefined* | Objeto que permite introducir valores iniciales para uno o todos los [`WafoForm Element`](#wafoform-element) que se encuentren en la forma. Útil para edición. |

> **Nota:** Existe otra forma de disparar el evento *onSubmit* en caso de no querer utilizar el botón default.

#### Objeto formValue
Este objeto es la respuesta que entrega el componente al momento de realizar un submit, sin importar como este se realice. Indica la validez general de la forma y el valor actual de todos los [`WafoForm Element`](#wafoform-element); cada uno representado por su llave (*name*), especificando además su estado de validez y errores en caso de existir.

> **Nota:** Cada valor viene representado por su llave, la cual proviene de la propiedad *name* de los [`WafoForm Element`](#wafoform-element).

Ejemplo:
```javascript
{
	valid: false, // validation status of the entire form
	name: {
		errors: [
			// error objects from validation...
			{
				error: "required",
				message: "This field is required.",
			},
		],
		valid: false, // validation status of this field.
		value: "", // current value of the field.
	},
	age: {
		errors: [],
		valid: true,
		value: "25",
	},
}
```

#### Objeto values y edición en WafoForm
Es común que cuando tengamos una forma no solo la utilicemos para introducir información nueva sino también para la edición de la misma. `WafoForm` no hace distinción especifica a la edición de información, pero si permite la carga de valores iniciales para uno o todos de sus hijos mediante la propiedad *values*.

El objeto *values* similar al objeto *formValue* representa cada uno de los [`WafoForm Element`](#wafoform-element) mediante su llave (*name*). Cada una de estas llaves debe ser un `String` que será utilizado como el valor inicial.

Ejemplo:
```javascript
{
	name: "Ramón Guerrero",
	email: "ramon@gmail.com",
}
```

Ejemplo de uso:
```javascript
import React from 'react';
import { WafoForm, WafoFormInput } = 'wafo-forms';

class Example extends React.Component {
	state = {
		user: {
			id: 0
		},
	}

	componentDidMount() {
		// logic / api call to get values...
	}

	handleSubmit = (formValue) => {
		// do something with the values...
	}

	render() {
		const { user } = this.state;

		return (
			<WafoForm
				key={user.id}
				buttonText="Save changes"
				onSubmit={this.handleSubmit}
				values={user}
			>

				<WafoFormInput
					type="email"
					name="email"
					label="User email"
				/>

				{/* Other WafoForm Elements... */}

			</WafoForm>
		);
	}
}
```

Es importante mencionar que `WafoForm` solo considera estos valores durante su creación por lo que si la obtención de los valores es asíncrona puede ser útil asignarle un `key` que este relacionado (como el id, o algún otro identificador único) para que se actualice el componente una vez que llegan estos valores.

Esto podría no ser necesario si hay un componente padre que se encarge de obtener esta información o provenga de algún otro lugar del sistema como [Redux](https://redux.js.org/).

#### Disparar onSubmit manualmente

onSubmit es una función de [`WafoForm`](#wafoform) que se ejecuta al momento de realizar la acción de submit (presionando *Enter* en el teclado o el botón de la forma, etc.). Esta función valida cada uno de los [`WafoForm Element`](#wafoform-element) y genera un objeto [`formValue`](#objeto-formvalue) que sera devuelto a la función que se haya especificado en la propiedad `onSubmit`.

Una posible alternativa en el caso que se desee disparar esta función desde otro componente, o desde otra función, es utilizar un [Ref](https://reactjs.org/docs/refs-and-the-dom.html) y así acceder directamente a la funcion onSubmit.

Ejemplo:
```javascript
import React from 'react';
import { WafoForm } from 'wafo-forms';

class Example extends React.Component {
	constructor(props) {
		super(props);
		this.formRef = React.createRef();
	}

	handleSubmit = (formValue) => {
		// do something with the values...
	}

	render() {
		return (
			<div>
				<WafoForm
					ref={this.formRef}
					buttonText="Save changes"
					onSubmit={this.handleSubmit}
				>
				{/* WafoForm Elements... */}
				</WafoForm>

				{/* Botón fuera de Wafo Forms */}
				<button
					type="button"
					onClick={() => { this.formRef.current.onSubmit(); }}
				>onSubmit</button>
			</div>
		);
	}
}
```


### WafoFormInput
El componente más básico de todos, puede ser utilizado para introducir casi cualquier tipo de carácter. Ofrece funciones similares a las de la etiqueta [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) de HTML.

Ejemplo:
```javascript
import React from 'react';
import { WafoFormInput } from 'wafo-forms';

const Example = () => (
	<WafoFormInput
		type="text"
		name="example"
		customClass="custom-class"
		placeholder="A placeholder"
		label="An input field"
	/>
);
```
#### Props

Este componente comparte propiedades con otros componentes de la librería. Las propiedades que no se comparten con el resto estan marcadas en negrita.

| Prop | Type | Required | Default value | Description |
|--|--|--|--|--|
| name | String | Yes |  | Esta propiedad es utilizada como la llave que identifica al componente dentro de la forma y debe ser único. |
| **type** | String | No | "text" | Se especifica el tipo de `<input>` que va manejar el componente. Más sobre [Input Types.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) |
| placeholder | String | No | "" | Texto que se muestra cuando el valor esta vacío. De omitirse no se mostrara nada. |
| customClass | String | No | "" | Clase que será agregada al componente. |
| label | String | No | "" | Texto que se muestra junto con el `<input>`. De omitirse no se mostrara nada.|
| validations | Object | No | {} | Objeto con las validaciones a las que se sometera el valor actual. La validación se realiza cada vez que este cambia o al momento de dispararse *onSubmit* de [`WafoForm`](#wafoform). |


### WafoFormSelect
Este componente permite mostrar una lista de opciones entre las cuales el usuario puede elegir. Ofrece funciones similares a las de la etiqueta [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) de HTML.

Ejemplo:
```javascript
import React from 'react';
import { WafoFormSelect } from 'wafo-forms';

const Example = () => {
	const options = [
		{
			value: "1",
			display: "Option with id 1",
		},
		{
			value: "2",
			display: "Option with id 2",
		},
	];

	return (
		<WafoFormSelect
			name="example"
			customClass="custom-class"
			label="A select field"
			defaultValue="Select one"
			options={options}
		/>
	);
};
```

#### Props
Este componente comparte propiedades con otros componentes de la librería. Las propiedades que no se comparten con el resto estan marcadas en negrita.

| Prop | Type | Required | Default value | Description |
|--|--|--|--|--|
| name | String | Yes |  | Esta propiedad es utilizada como la llave que identifica al componente dentro de la forma y debe ser único. |
| customClass | String | No | "" | Clase que será agregada al componente. |
| label | String | No | "" | Texto que se muestra junto con el `<select>`. De omitirse no se mostrara nada.|
| **defaultValue** | String | No | "Select an option" | Es la opción que estará seleccionada por default al iniciar (similar a placeholder) y de no seleccionar otra opción retornara un String vacio como valor. |
| **options** | [Array](#array-options) | No | [] | Array con las opciones a mostrar, entre las cuales podrá elegir el usuario. Este arreglo puede ser modificado incluso después de que el componente sea iniciado, como en el caso de provenir de una fuente asíncrona. |
| validations | Object | No | {} | Objeto con las validaciones a las que se sometera el valor actual. La validación se realiza cada vez que este cambia o al momento de dispararse *onSubmit* de [`WafoForm`](#wafoform). |

#### Array options
Este array esta conformado de objetos sencillos que contienen dos propiedades; el valor a retornar y el texto a mostrar en la interfaz. Si el array se encuentra vacio, simplemente se mostrara la opción proporcionada en *defaultValue* y siempre retornara un string vacio.

Ejemplo:
```javascript
[
	{
		value: "1",
		display: "Option with id 1",
	},
	{
		value: "2",
		display: "Option with id 2",
	},
];
```


### WafoFormTextArea
Este componente permite introducir grandes cantidades de texto con soporte para multiples lineas. Ofrece funciones similares a las de la etiqueta [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) de HTML.

Ejemplo:
```javascript
import React from 'react';
import { WafoFormTextArea } from 'wafo-forms';

const Example = () => (
	<WafoFormTextArea
		name="example"
		customClass="custom-class"
		placeholder="Insert your text here..."
		label="A text area field"
	/>
);
```

#### Props
Este componente comparte propiedades con otros componentes de la librería.

| Prop | Type | Required | Default value | Description |
|--|--|--|--|--|
| name | String | Yes |  | Esta propiedad es utilizada como la llave que identifica al componente dentro de la forma y debe ser único. |
| placeholder | String | No | "" | Texto que se muestra cuando el valor esta vacio. De omitirse no se mostrara nada. |
| customClass | String | No | "" | Clase que será agregada al componente. |
| label | String | No | "" | Texto que se muestra junto con el `<textarea>`. De omitirse no se mostrara nada. |
| validations | Object | No | {} | Objeto con las validaciones a las que se sometera el valor actual. La validación se realiza cada vez que este cambia o al momento de dispararse *onSubmit* de [`WafoForm`](#wafoform). |

### Componentes personalizados

Los `WafoForm Element` incluidos cubren una gran parte de las necesidades que pudieran presentarse, desde fechas hasta opciones mutiples, aún así, pueden presentarse situaciones donde no sean suficiente y necesitemos una solución más especifica. En estos casos, lo recomendado sería crear nuestro propio componente.

Para que un componente funcione dentro de [`WafoForm`](#wafoform) debe aceptar algunos props en especifico. Estos le permiten al componente padre manejar el *State* y comunicarse con el.

#### Props
Las propiedades que son 100% necesarias estan marcadas en negritas. El resto puede ser omitido pero se perderían funcionalidades como la validación.

| Prop | Type | Description |
|--|--|--|
| **name** | String | Esta propiedad es utilizada como llave que identifica al componente dentro de [`WafoForm`](#wafoform) y debe ser único. |
| **handleInputChange** | Function | Es la forma de comunicación entre el componente y [`WafoForm`](#wafoform). Debe ser llamada en alguna parte de la logica de actualización de tu componente y recibir como parametro un [Objeto](#objeto-handleinputchange) que sera recibido por `WafoForm`. |
| value | `any` | Indica el valor actual en el *State* de `WafoForm` para este componente. Puede ser útil para introducir el valor inicial o en caso de crear un Functional Component. |
| valid | Boolean | Indica el valor actual de la validación. De no recibir un Objeto de validaciones, siempre retornará como *True* |
| touched | Boolean | Indica si el valor ha sido modificado. Solo retorna *False* si el valor inicial no ha cambiado nunca. |
| errors | Array | Array con los objetos de error provenientes de la validación. De no recibir un Objeto de validaciones, siempre retornará vacío. |
| validations | Object | Objeto con las validaciones a las que se someterá el valor actual. La validación se realiza cada vez que este cambia o al momento de dispararse onSubmit de [`WafoForm`](#wafoform). |

#### Objeto handeInputChange
Este es el objeto que debe recibir la función `handleInputChange`:
```
{
	target: {
		name,
		value: "Something."
	}
}
```
 - **name:** Debe ser el `name` recibido como prop.
 - **value:** El valor actual que contenga el componente. Podría tratarse de un `WafoForm Element` compuesto de multiples entradas y el valor que se desea manejar sea la combinación de ellas.

#### Ejemplo Class Component
Vamos a crear un componente `WafoForm Element` que nos permita agregar archivos de imagen y previsualizar la imagen. Nos interesa que la imagen se vaya en conjunto con otros campos y además tenemos la ventaja de que podremos usarlo en cualquier otro formulario `WafoForm`.

```javascript
import React from 'react';

class ImageSelector extends React.Component {
	state = {
		value: '',
		filename: '',
		fileUrl: '',
	}

	handleOnChange = (event) => {
		const { target: { files, value } } = event;
		const { name, handleInputChange } = this.props;

		this.setState({
			value,
			filename: files[0].name,
			fileUrl: URL.createObjectURL(files[0]),
		}, () => {
			handleInputChange({
				target: {
					name,
					value: files[0],
				}
			});
		});
	}

	render() {
		const { name, valid, touched, errors } = this.props;
		const { value, fileUrl, filename } = this.state;

		return (
			<div>
				<div className="preview">
					<img src={fileUrl} alt="Preview" />
					<p>{filename}</p>
				</div>

				<div className="input">
					<label htmlFor={name}>Selecciona una imagen</label>
					<input
						type="file"
						id={name}
						name={name}
						onChange={this.handleOnChange}
						value={value}
						accept=".png, .jpg, .jpeg"
					/>
				</div>

				{!valid && touched
					&& (
						<ul className="errors">
							{errors.map(error => (<li key={error.error}>{error.message}</li>))}
						</ul>
					)
				}
			</div>
		);
	}
}
```

#### Ejemplo Functional Component
Este componente nos va permitir introducir hora y minutos por separado y al final recibir el resultado en un objeto con ambos valores.

```javascript
import React from 'react';

const TimeSelector = ({ name, handleInputChange, value }) => {
	const handleOnChange = (event) => {
		const { target: { name: targetName, value: targetValue } } = event;
		handleInputChange({
			target: {
				name,
				value: {
					...value,
					[targetName]: targetValue,
				},
			},
		});
	};

	return (
		<div>
			<label>Introduce hora y minutos</label>
			<div>
					<input
						type="number"
						name="hours"
						value={value.hours}
						onChange={handleOnChange}
						min="1"
						max="12"
					/>
					<span>:</span>
					<input
						type="number"
						name="minutes"
						value={value.minutes}
						onChange={handleOnChange}
						min="0"
						max="59"
					/>
			</div>
		</div>
	);
};
```

#### Como utilizarlos
Su utilización es muy similar a como se utilizaría cualquier otro `WafoForm Element`.

```javascript
import React from 'react';
import { WafoForm } from 'wafo-forms';
import { TimeSelector, ImageSelector } from './example';

const Example = () => {
	const handleSubmit = (values) => {
		// Do something with the values...
	};
	
	return (
		<WafoForm buttonText="Submit" onSubmit={handleSubmit}>
			<TimeSelector
				name="time"
			/>

			<ImageSelector
				name="image"
			/>
		</WafoForm>
	);
};
```

Los puntos clave a notar en los ejemplos anteriores son el uso de las propiedades **name** y **handleInputChange**, además de el uso de las propiedades que nos permiten mostrar los errores de validación. Otra de las ventajas es que los componentes `WafoForm Element` pueden ser Class Componentes (primer ejemplo) o Functional Components (segundo ejemplo). Puedes ver más sobre los tipos de Componentes en React [aquí.](https://reactjs.org/docs/components-and-props.html)

> **Nota:** No olvides considerar utilizar la propiedad **value** para inicializar el State de tu componente, de lo contrario no podras utilizarlo para editar valores.

### Componentes no WafoFormElement

**To-do:** Escribir esto.

## Validación

**To-do:** Escribir esto.
**To-do:** Escribir sobre custom errors.

## Estilos

**To-do:** Escribir esto... ¿Cómo añadir estilos default?

## TODO

 - Soporte para imágenes.
 - Soporte para fechas.
 - Soporte para Rich Text  (WYSIWYG).
 - Mejorar validaciones.
 
### Limitaciones
Las validaciones disponibles son muy especificas y no cubren todos los casos. Como solución momentánea y para permitir mayor flexibilidad se permite validar mediante expresiones regulares.
