const {useState} = require('react');

const Components = require('../../../components/build/components_index');

const {List} = Components;

const App = () => {
    const [columns, setColumns] = useState(initialDataResult.columns);
    const [sort, setSort] = useState(initialSortResult);
    const [filter, setFilter] = useState(initialFilterResult)

    return <List
        columns={columns}
        sort={(sortType) => {
            fetch(`/api?sort=${sortType}&filter=${filter}`)
                .then(res => res.json())
                .then(data => {
                    setColumns(data.columns);
                    setSort(sortType);
                })
                .catch(err => {
                    console.error(err);
                });
        }}
        filter={(filterType) => {
            fetch(`/api?sort=${sort}&filter=${filterType}`)
                .then(res => res.json())
                .then(data => {
                    setColumns(data.columns);
                    setFilter(filterType);
                })
                .catch(err => {
                    console.error(err);
                });
        }}
    />
};

module.exports = App;
