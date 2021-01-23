import React, { Component } from 'react';
import OrgChart from '@balkangraph/orgchart.js';

export default class nychart extends Component {

     constructor(props) {
       super(props);
       this.divRef = React.createRef();
     }

   shouldComponentUpdate() {
       return false;
   }

   componentDidMount() {
       this.chart = new OrgChart(this.divRef.current , {
           nodes: this.props.nodes,
           template: "isla", 
           enableSearch: false,
            mouseScrool: OrgChart.action.none, 
           nodeBinding: {
               field_0: "name",
               field_1: "title",
               field_2:"Department",
           }
       });

   }

   render() {
       return (
            <div id="tree" ref={this.divRef}></div>
       );
   }
}

