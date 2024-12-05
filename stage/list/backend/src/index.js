if (typeof window === 'undefined' || typeof self === 'undefined') {
    global.window = {};
    global.self = {};
}

const Components = require('../../components/build/components_index');

const {List} = Components;

const App = ({columns}) => {
    return <List
        columns={columns}
        sort={() => {
        }}
        filter={() => {
        }}
    />
};

module.exports = App;
