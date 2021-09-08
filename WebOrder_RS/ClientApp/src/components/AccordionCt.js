import { faUserCheck } from '@fortawesome/fontawesome-free-solid';
import React, { Component } from 'react';


export class AccordionCt extends React.Component {
    static displayName = AccordionCt.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="w-100 " id={this.props.accodion}>
                <div className="card">
                    <div className="card-header no-padding-TB" >
                        <h5 className="mb-0">
                            <button className="btn btn-link accordionBtn " data-toggle="collapse" data-target={"#" + this.props.collapse} aria-expanded="true" aria-controls={this.props.collapse}>
                                <legend> {this.props.head}</legend>
                            </button>
                        </h5>
                    </div>

                    <div id={this.props.collapse} className="collapse " aria-labelledby="headingOne" data-parent={this.props.accodion}>
                        <div className="card-body">
                            {this.props.body}
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}