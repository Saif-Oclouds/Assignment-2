import { LightningElement, wire} from 'lwc';
import getGraduateStudentList from '@salesforce/apex/customObjectController.getGraduateStudentList';
import deleteRecord from '@salesforce/apex/customObjectController.deleteRecord';
export default class CustomObjectManager extends LightningElement {
    totalGraduateStudents;
    visibleGraduateStudents;
    searchKeyword = '';
    selectedField = 'Name';

    @wire(getGraduateStudentList)
    wiredGraduateStudents({error, data}){
        if(data){ 
            this.totalGraduateStudents = data;
        }
        if(error){
            console.error(error);
        }
    }

    updateGraduateStudentHandler(event){
        this.visibleGraduateStudents = [...event.detail.records];
    }
 
    handleDeleteClick(event) {
        const recordId = event.target.dataset.id;

        deleteRecord({ recordId: recordId })
            .then(result => {
                // Update the list of students after deletion
                this.totalGraduateStudents = this.totalGraduateStudents.filter(student => student.Id !== recordId);
                this.filterStudents(); // Apply any existing search/filter criteria
            })
            .catch(error => {
                console.error('Error deleting record', error);
            });
    }

    //---------------SEARCH
    handleSearchChange(event) {
        this.searchKeyword = event.detail.searchKeyword.toLowerCase();
        this.selectedField = event.detail.searchField;

        this.visibleGraduateStudents = this.totalGraduateStudents.filter(
            (student) =>
                student[this.selectedField].toLowerCase().includes(this.searchKeyword)
        );
    }
}
