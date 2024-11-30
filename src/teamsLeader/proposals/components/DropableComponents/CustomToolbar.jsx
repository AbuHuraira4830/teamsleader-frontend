const CustomToolbar = () => (
  <div id="toolbar" className="px-3" style={{ border: "none" }}>
    <select className="ql-header" defaultValue="">
      <option value="1"></option>
      <option value="2"></option>
      <option value=""></option>
    </select>
    <select className="ql-font" defaultValue="">
      <option value="serif"></option>
      <option value="monospace"></option>
      <option value=""></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <button className="ql-blockquote"></button>
    <select className="ql-color"></select>
    <select className="ql-background"></select>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-video"></button>
    <button className="ql-clean"></button>
    <button className="ql-list" value="ordered"></button>
    <button className="ql-list" value="bullet"></button>
    {/* <button className="ql-insertTable">Table</button> */}
  </div>
);

export default CustomToolbar;
