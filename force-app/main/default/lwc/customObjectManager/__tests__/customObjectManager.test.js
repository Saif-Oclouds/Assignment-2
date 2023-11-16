import { createElement } from 'lwc';
import CustomObjectManager from 'c/customObjectManager';

describe('c-custom-object-manager', () => {
    let element;

    beforeEach(() => {
        element = createElement('c-custom-object-manager', {
            is: CustomObjectManager
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('deletes record on delete button click', () => {
        const deleteButton = element.shadowRoot.querySelector('lightning-button-icon[icon-name="utility:delete"]');
        deleteButton.click();
        expect(element.handleDeleteClick).toHaveBeenCalled();
    });
});