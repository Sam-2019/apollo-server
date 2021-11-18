var React = require("react");
var DefaultLayout = require("../layouts/default");

function MemberRegistration(props) {
  return (
    <DefaultLayout title={props.title}>
      <div style={{ backgroundColor: "red" }}>Hello {props.name}</div>
    </DefaultLayout>
  );
}

module.exports = MemberRegistration;
