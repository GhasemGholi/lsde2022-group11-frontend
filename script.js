var chart = echarts.init(document.getElementById('main'));

var option = {
    tooltip: {},
    title: {
        text: 'Communities Word Cloud with amount of vertices',
    },
    series: [{
        type: 'wordCloud',
        gridSize: 20,
        sizeRange: [15, 40],
        rotationRange: [-45, 45],
        rotationStep: 1,
        shape: 'circle',
        width: 1000,
        height: 1000,
        textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            normal: {
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: [
            {
                name: 'Astronomy, Astrophysics, \nSpace and Planetary Science',
                value: 303
            },
            {
                name: 'Cancer Research and Oncology',
                value: 228
            },
            {
                name: 'Ecology, Evolution, Behavior, \nSystematics and Plant Science',
                value: 132
            },
            {
                name: 'Immunology and Allergy',
                value: 120
            },
            {
                name: 'Drug Discovery and General Medicine',
                value: 100
            },
            {
                name: 'Molecular Biology and Biochemistry',
                value: 92
            },
            {
                name: 'General Materials Science \nand General Chemistry',
                value: 91
            },
            {
                name: 'Oceanography and Global \nand Planetary Change',
                value: 86
            },
            {
                name: 'Cell Biology and Molecular Biology',
                value: 84
            },
            {
                name: 'Molecular Biology and Genetics',
                value: 60
            },
            {
                name: 'Obstetrics and Gynaecology \nand Reproductive Medicine',
                value: 58
            },
            {
                name: 'General Chemistry and Organic Chemistry',
                value: 51
            },
            {
                name: 'General Chemistry and Applied Mathematics',
                value: 46
            },
            {
                name: 'Pharmacology and Drug Discovery',
                value: 45
            },
            {
                name: 'Applied Mathematics and Ocean Engineering',
                value: 41
            },
            {
                name: 'Cellular, Molecular Neuroscience, \nPsychiatry and Mental health',
                value: 33
            },
            {
                name: 'Diabetes, Metabolism and Endocrinology',
                value: 32
            },
            {
                name: 'Organic Chemistry and Physical \nand Theoretical Chemistry',
                value: 32
            }
        ]
    }]
};

chart.setOption(option);

window.onresize = chart.resize;