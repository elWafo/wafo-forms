import React from "react";
import { WafoForm, WafoFormInput } from "forms";

const styles = {
  full_width: { width: "100%", padding: "0 1rem" }
};

const ArrayForm = () => {
  const [hide, setHide] = React.useState(false);

  const handleForm = (form, values) => {
    console.log(form);
  };

  return (
    <div>
      <h3>Array Form Example</h3>
      <WafoForm values={{}} locale="en" onSubmit={handleForm}>
        <WafoFormInput
          name="title"
          placeholder="Title"
          validations={{ required: true }}
        />
        <div>
          {!hide && (
            <WafoFormInput
              name="desc"
              placeholder="Description"
              validations={{ required: true }}
            />
          )}
        </div>
        <div style={styles.full_width}>
          <h5>User info:</h5>
        </div>
        <div style={styles.full_width} groupName="user">
          <div className="row">
            <WafoFormInput
              name="name"
              placeholder="Name"
              customClass="col-md-4"
              validations={{ required: true }}
            />
            <WafoFormInput
              name="last_name"
              placeholder="Last name"
              customClass="col-md-4"
              validations={{ required: true }}
            />
            <WafoFormInput
              name="color"
              placeholder="Favorite color"
              customClass="col-md-4"
            />
          </div>
        </div>

        <div style={styles.full_width}>
          <button type="submit">Submit form</button>
        </div>
      </WafoForm>

      <button onClick={() => setHide(prev => !prev)}>Toggle description</button>
    </div>
  );
};

export default ArrayForm;
