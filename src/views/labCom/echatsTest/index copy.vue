<template>
    <div style="background: #05232b;">
        <div id="container"></div>
    </div>
</template>

<script>
import G6 from '@antv/g6';
import bdz2 from '@/assets/220kv.png'
import bdz1 from '@/assets/110kv拷贝.png'
import bdz3 from '@/assets/35kv拷贝8.png'
export default {
    name: 'LabProjectIndex',

    data() {
        return {


        };
    },

    mounted() {
        this.graph()
    },

    methods: {
        graph() {
            let data = {
                "id": "郑中心",
                img: bdz2,
                "children": [
                    {
                        "id": "1-1",
                        img: bdz1,
                        "children": [
                            {
                                "id": "1-1-1",
                                img: bdz3,
                            },
                            {
                                "id": "1-1-2",
                                img: bdz3,
                            },
                            {
                                "id": "1-1-3",
                                img: bdz3,
                            },
                            {
                                "id": "1-1-4",
                                img: bdz3,
                            },
                            {
                                "id": "1-1-5",
                                img: bdz3,
                            }
                        ]
                    },
                    {
                        "id": "1-2",
                        img: bdz1,
                        "children": [
                            {
                                "id": "1-2-1",
                                img: bdz3,
                            },
                            {
                                "id": "1-2-2",
                                img: bdz3,
                            },
                            {
                                "id": "1-2-3",
                                img: bdz3,
                            }
                        ]
                    },
                    {
                        "id": "1-3",
                        img: bdz1,
                        "children": [
                            {
                                "id": "1-3-1",
                                img: bdz3,
                            },
                            {
                                "id": "1-3-2",
                                img: bdz3,
                            },
                            {
                                "id": "1-3-3",
                                img: bdz3,
                            },
                            {
                                "id": "1-3-4",
                                img: bdz3,
                            },
                            {
                                "id": "1-3-5",
                                img: bdz3,
                            }
                        ]
                    },
                    {
                        "id": "1-4",
                        img: bdz1,
                        "children": [
                            {
                                "id": "1-4-1",
                                img: bdz3,
                            },
                            {
                                "id": "1-4-2",
                                img: bdz3,
                            },
                            {
                                "id": "1-4-3",
                                img: bdz3,
                            }
                        ]
                    }
                ]
            }


            // G6.Util.traverseTree(data, (d) => {
            //     d.leftIcon = {
            //         style: {
            //             fill: '#e6fffb',
            //             stroke: '#e6fffb',
            //         },
            //         img: bdz2,
            //     };
            //     return true;
            // });


            const container = document.getElementById('container');
            const width = container.scrollWidth;
            const height = container.scrollHeight || 500;
            const graph = new G6.TreeGraph({
                container: 'container',
                width,
                height,
                linkCenter: false,
                modes: {
                    default: [
                        {
                            type: 'collapse-expand',
                            onChange: function onChange(item, collapsed) {
                                const data = item.get('model');
                                data.collapsed = collapsed;
                                return true;
                            },
                        },
                        'drag-canvas',
                        'zoom-canvas',
                    ],
                },
                defaultNode: {
                    type: 'image',
                    size: 26,
                    labelCfg: {
                        style: {
                            fill: '#fff',
                            fontSize: 14,
                            // background: {
                            //     // fill: 'red',
                            //     stroke: '#9EC9FF',
                            //     padding: [2, 2, 2, 2],
                            //     radius: 2,
                            // },
                        },
                        position: 'bottom',
                    },

                },
                defaultEdge: {
                    type: "polyline",
                    // labelCfg: {
                    //     autoRotate: false,
                    //   },
                },
                layout: {
                    type: 'dendrogram',
                    direction: 'LR',
                    nodeSep: 20,
                    rankSep: 150,
                    radial: true,
                },
            });
            let lineData = {
                '1-1': '1-1的路',
                '1-1-1': '1-1-1的路',
                '1-1-2': '1-1-2的路',
                '1-1-3': '1-1-3的路',
                '1-1-4': '1-1-4的路',
                '1-1-5': '1-1-5的路',
                '1-2': '1-2的路',
                '1-2-1': '1-2-1的路',
                '1-2-2': '1-2-2的路',
                '1-2-3': '1-2-3的路',
                '1-3': '1-3的路',
                '1-3-1': '1-3-1的路',
                '1-3-2': '1-3-2的路',
                '1-3-3': '1-3-3的路',
                '1-3-4': '1-3-4的路',
                '1-3-5': '1-3-5的路',
                '1-4': '1-4的路',
                '1-4-1': '1-4-1的路',
                '1-4-2': '1-4-2的路',
                '1-4-3': '1-4-3的路',
            };

            graph.node(function (node) {
                console.log(node, 'sssssssssss')
                let size = [30, 30]; // 默认大小
                // 根据层级调整节点大小
                if (node.depth === 0) {
                    size = [60, 60]; // 一级节点较大
                } else if (node.depth === 1) {
                    size = [40, 40]; // 二级节点较小
                } else if (node.depth === 2) {
                    size = [30, 30]; // 二级节点较小
                }
                return {
                    label: node.id,
                    size: size,
                    img: node.img,
                    text: node.text
                };
            });
            let i = 0;
            graph.edge(function (node) {
                console.log(node, 'nodes')
                i++;
                return {
                    type: 'polyline',
                    color: '#fff',
                    label: lineData[node.target],
                    labelCfg: {
                        style: {
                            fill: '#fff', // 设置标签字体颜色为白色
                        },
                        position: 'top', // 将标签放置在边的中心位置
                    },
                };
            });

            // graph.node(function (node) {
            //     return {
            //         label: node.id,
            //     };
            // });

            graph.data(data);
            graph.render();
            graph.fitView();
        }
    },
};
</script>

<style lang="scss" scoped>
// #container{
//     transform: rotateZ(45deg) skew(-15deg,-15deg);

// }

</style>