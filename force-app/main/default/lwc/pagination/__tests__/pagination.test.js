import { createElement } from 'lwc';
import Pagination from 'c/pagination';

describe('c-pagination', () => {
    let element;

    beforeEach(() => {
        element = createElement('c-pagination', {
            is: Pagination
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('navigates to next page on next button click', () => {
        const nextButton = element.shadowRoot.querySelector('[data-id="nxt"]');
        nextButton.click();

        expect(element.nextHandler).toHaveBeenCalled();
    });

    it('navigates to previous page on previous button click', () => {
        const prevButton = element.shadowRoot.querySelector('[data-id="prev"]');
        prevButton.click();

        
        expect(element.previousHandler).toHaveBeenCalled();
    });
});