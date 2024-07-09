var chart = (data) => {
    const width = 600;
    const root = d3.hierarchy(data);
    const dx = 10;
    const dy = width / (root.height + 1);
    const tree = d3.tree().nodeSize([dx, dy]);
    root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
    tree(root);

    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });
    const height = x1 - x0 + dx * 2;

    const svg = d3.create("svg")
        .attr("width", width * 1.2)
        .attr("height", height)
        .attr("viewBox", [-dy / 3, x0 - dx, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    const link = svg.append("g")
        .attr("fill", "none")
        // .attr("stroke", '#5751BB')
        .attr("stroke", '#888')
        // .attr("stroke-opacity", 0.4)
        // .attr("stroke-width", 1.5)
        .attr("stroke-width", 0.5)
        .selectAll()
        .data(root.links())
        .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    const node = svg.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 1)
        .attr("fill", "white")
        .selectAll()
        .data(root.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        // .attr("fill", '#C4C3FB')
        .attr("fill", d => d.children ? "#C4C3FB" : "white")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name)
        .attr("stroke", "#445")
        .attr("paint-order", "stroke");

    return svg.node();
    Plot.plot({
        axis: null,
        margin: 10,
        marginLeft: 40,
        marginRight: 160,
        width: 928,
        height: 1800,
        marks: [
            Plot.tree(flare, { path: "name", delimiter: "." })
        ]
    })
}

data = {
    "name": "Fähigkeiten",
    "children": [
        {
            "name": "Anwendungsentwicklung",
            "children": [
                {
                    "name": "Frontend",
                    "children": [
                        {
                            "name": "Frameworks",
                            "children": [
                                {
                                    "name": "React",

                                },
                                {
                                    "name": "TailwindCSS",

                                },
                            ]
                        },
                        {
                            "name": "Vanilla",
                            "children": [
                                {
                                    "name": "JavaScript",

                                },
                                {
                                    "name": "HTML",

                                },
                                {
                                    "name": "CSS",

                                },
                            ]
                        },
                    ]
                },
                {
                    "name": "Backend",
                    "children": [
                        {
                            "name": "NodeJS",
                            "children": [
                                {
                                    "name": "Next.js",

                                },
                                {
                                    "name": "Express",

                                },
                                {
                                    "name": "PM2",

                                },
                            ]
                        },
                        {
                            "name": "Datenbanken",
                            "children": [
                                {
                                    "name": "MongoDB",

                                },
                                {
                                    "name": "myPHPAdmin",

                                },
                            ]
                        }
                    ],
                },
                {
                    "name": "Versionsmanagement",
                    "children": [
                        {
                            "name": "GitLab",
                        },
                        {
                            "name": "GitHub",
                        },
                    ],
                },
                {
                    "name": "Cloud",
                    "children": [
                        {
                            "name": "AWS Lightsail",
                        },
                    ],
                },
            ]
        },
        {
            "name": "Visuell",
            "children": [
                {
                    "name": "Bild",
                    "children": [
                        {
                            "name": "Adobe",
                        },
                        {
                            "name": "Figma",
                        },
                        {
                            "name": "Canva",
                        },
                    ]
                },
                {
                    "name": "Video",
                    "children": [
                        {
                            "name": "Adobe After Effects",
                        },
                        {
                            "name": "Blender",
                        },
                        {
                            "name": "Unreal Engine 5",
                        },
                        {
                            "name": "DaVinci Resolve",
                        },
                    ]
                },
                {
                    "name": "3D",
                    "children": [
                        {
                            "name": "Spline 3D",
                        },
                        {
                            "name": "Blender",
                        },
                    ]
                },
                {
                    "name": "AR",
                    "children": [
                        {
                            "name": "SparkAR",
                        },
                        {
                            "name": "TikTok Effect Studio",
                        },
                    ]
                },
                {
                    "name": "Games",
                    "children": [
                        {
                            "name": "Unity",
                        },
                        {
                            "name": "Unreal",
                        },
                    ]
                },
                {
                    "name": "VR",
                    "children": [
                        {
                            "name": "Unreal Engine 5",
                        },
                        {
                            "name": "Unity",
                        },
                    ]
                }
            ]
        },
        {
            "name": "Sound",
            "children": [
                {
                    "name": "Ableton Live",
                },
                {
                    "name": "Logic",
                },
            ]
        },
        {
            "name": "Webseiten",
            "children": [
                {
                    "name": "Webflow",
                },
            ]
        },
        {
            "name": "Konzeption",
            "children": [
                {
                    "name": "Creative Direction",
                },
                {
                    "name": "Art Direction",
                },
                {
                    "name": "Strategische Beratung",
                },
            ]
        }
    ]
}

document.getElementById('diagram').innerHTML = "";
let svg = chart(data);
svg.style.width = '100%';
document.getElementById('diagram').appendChild(svg);