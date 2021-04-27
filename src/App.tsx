import React, { Suspense } from "react";
import "./App.css";
import { DynamicComponent } from "./DynamicComponent";

type FunctionsMap = {
  [key: string]: () => void;
};

const functionsMap: FunctionsMap = {
  BUTTON_CTA: () => console.log("button clicked"),
};

const json = [
  {
    name: "Header",
    props: [
      {
        type: "string",
        name: "text",
        value: "Header text",
      },
    ],
    children: [
      {
        name: "Button",
        props: [
          {
            type: "string",
            name: "title",
            value: "button title",
          },
          { type: "function", name: "onClick", value: "BUTTON_CTA" },
        ],
      },
    ],
  },
  {
    name: "Button",
    props: [{ type: "string", name: "title", value: "custom button title" }],
  },
];

const parseProps = (props: any) => {
  const values = props.map((p: any) => {
    if (p.type === "function") {
      return { [p.name]: functionsMap[p.value] };
    }
    return { [p.name]: p.value };
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
        component={c.name}
        propValues={parseProps(c.props)}
      >
        {c.children
          ? c.children.map((cc, index) => (
              <DynamicComponent
                key={index}
                component={cc.name}
                propValues={parseProps(cc.props)}
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
