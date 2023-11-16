import { LightningElement, track } from 'lwc';

export default class SearchBar extends LightningElement {
    @track searchKeyword = '';
    @track selectedField = 'Name';
    
    searchOptions = [
        { label: 'Name', value: 'Name' },
        { label: 'Degree', value: 'Degree__c' }
    ];

    handleSearchChange(event) {
        this.searchKeyword = event.target.value;
        this.dispatchEvent(new CustomEvent('searchchange', { detail: { searchKeyword: this.searchKeyword, searchField: this.selectedField } }));
    }

    handleFieldChange(event) {
        this.selectedField = event.detail.value;
        this.dispatchEvent(new CustomEvent('searchchange', { detail: { searchKeyword: this.searchKeyword, searchField: this.selectedField } }));
    }
}