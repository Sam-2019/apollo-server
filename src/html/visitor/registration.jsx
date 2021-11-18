var React = require("react");
var DefaultLayout = require("../layouts/default");

function VisitorRegistration(props) {
  return (
    <DefaultLayout title={props.title}>
      <div style={{ backgroundColor: "gray" }}>Hello {props.name}</div>
    </DefaultLayout>
  );
}

module.exports = VisitorRegistration;
