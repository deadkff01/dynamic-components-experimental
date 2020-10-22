import React, { Suspense } from "react";
import "./App.css";
import { DynamicComponent } from "./DynamicComponent";

const buttonCta = () => console.log("test click");

const json = [
  {
    componentName: "Header",
    propValues: [
      {
        type: "string",
        propName: "text",
        propValue: "Header text",
      },
    ],
    childrenComponents: [
      {
        componentName: "Button",
        propValues: [
          {
            type: "string",
            propName: "title",
            propValue: "button title",
          },
          { type: "function", propName: "onClick", propValue: "buttonCta" },
        ],
      },
    ],
  },
  {
    componentName: "Button",
    propValues: [
      { type: "string", propName: "title", propValue: "custom button title" },
    ],
  },
];

const parseProps = (propValues: any) => {
  const values = propValues.map((p: any) => {
    if (p.type === "function") {
      // TODO: elimite eval or find another way xD
      return { [p.propName]: eval(p.propValue) };
    }
    return { [p.propName]: p.propValue };
  });

  const transformToObject = values.reduce((obj: any, currentValue: any) => {
    Object.entries(currentValue).map(([key, value]) => (obj[key] = value));
    return obj;
  }, {});
  return transformToObject;
};

const parseToComponent = (
  <>
    {json.map((c, index) => (
      <DynamicComponent
        key={index}
        component={c.componentName}
        propValues={parseProps(c.propValues)}
      >
        {c.childrenComponents
          ? c.childrenComponents.map((cc, index) => (
              <DynamicComponent
                key={index}
                component={cc.componentName}
                propValues={parseProps(cc.propValues)}
              />
            ))
          : null}
      </DynamicComponent>
    ))}
  </>
);

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {/* dynamic wrapper (: */}
        {/* <ComponentWrapper component="Header" classNames={`mt-10`}>
          <div>test header</div>
          <div>test header 2</div>
        </ComponentWrapper>
        <ComponentWrapper
          component="Button"
          propValues={{ title: "test button" }}
        /> */}

        {parseToComponent}
      </Suspense>
    </div>
  );
}

export default App;
