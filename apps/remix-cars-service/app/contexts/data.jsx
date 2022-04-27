import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext({
	item: {},
	setItem: {},
	proposals: [],
	setProposals: () => {}
});

const DataContextProvider = ({ children }) => {
	const [proposals, setProposals] = useState([]);
	const [item, setItem] = useState({
		title: 'Molksvagen 2022 deal',
		price: 'USD 2000.00',
		status: 'assembling',
		delivery: '31 Aug 2021, 9:00pm',
		person: 'John Smith',
		proposal: null,
	});

	return (
		<DataContext.Provider value={{
			proposals,
			setProposals,
			item,
			setItem,
		}}>
			{children}
		</DataContext.Provider>
	);
};

DataContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { DataContext, DataContextProvider };
