import React, {useEffect} from 'react';
import {
    select,
    scaleBand,
    axisBottom,
    axisLeft,
    scaleLinear,
    stack,
} from "d3";
import './barGraph.css'

const BarGraph = (props) => {
    const keys = ["principal", "interest"];
    const colors = {
        principal: "#2b4959",
        interest: "#69a0e2",
    };
    useEffect(() => {
        /* remove current before drawing a new graph */
        var svgs = select("#bar_chart_" + props.id)
        svgs.selectAll('*').remove();

        const svg = select("#chart_" + props.id);
        const margin = {top: 20, right: 20, bottom: 60, left: 60};
        const graphWidth = 400 - margin.left - margin.right;
        const graphHeight = 400 - margin.top - margin.bottom;
        const stackGenerator = stack().keys(keys);
        const layers = stackGenerator(props.data);
        const yScale = scaleLinear().domain([0, Math.max.apply(Math, props.data.map(function (val) {
            return val.total_repayment;
        }))]).range([graphHeight, 0]);

        const x0Scale = scaleBand()
            .domain(props.data.map((d) => d.date))
            .range([30, graphWidth])
            .padding(0.3);

        const xAix = axisBottom(x0Scale);
        const yAix = axisLeft(yScale);

        svg
            .select(".x-axis")
            .attr("transform", "rotate(-65)")
            .attr("transform", `translate(0, ${graphHeight})`)
            .call(xAix)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("transform", function (d) {
                return "rotate(-30)";
            });
        svg
            .select(".y-axis")
            .attr("transform", `translate(${0 + 40}, 0 )`)
            .call(yAix);

        svg
            .selectAll(".layer")
            .data(layers)
            .join("g")
            .attr("class", "layer")
            .attr("fill", (layer) => colors[layer.key])
            .selectAll("rect")
            .data((layer) => layer)
            .join("rect")
            .attr("x", (sequence) => x0Scale(sequence.data.date))
            .attr("width", x0Scale.bandwidth())
            .attr("y", (sequence) => yScale(sequence[1]))
            .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));
    }, [props.data]);
    return (
        <div style={{width: "450px", height: "400px"}}
        >{props.data.length === 0 ? <>Those inputs are not eligible for this type of loan</> :
            <svg id={"chart_" + props.id} style={{width: "90%", height: "110%"}}>
                <g className="x-axis"/>
                <g className="y-axis"/>
            </svg>}
        </div>
    )
}

export default BarGraph;

