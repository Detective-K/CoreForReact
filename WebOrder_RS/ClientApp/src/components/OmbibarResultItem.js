import React, { Component } from 'react';
export default function ResultItem(props) {
    return (
        <div>
                <h2>{props.item.title}</h2>
                <h3>{props.item.subtitle}</h3>
        </div>
    );
}