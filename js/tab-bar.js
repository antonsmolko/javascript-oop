export default class TabBar {
    /**
     * Создает объект.
     * @param {{ element: HTMLElement, tabs: Tab[], onChange: Function }} args
     */
    constructor({ element, tabs, onChange = () => {} }) {
        this.init({ element, tabs });
        this.onChange = onChange;
    }

    /**
     * Инициализирует объект.
     * Устанавливает обработчик для обработки активации вкладки.
     * @private
     */
    init({ element, tabs }) {
        this._element = element;
        this._tabs = tabs;
        this._activeTab = this.tabs[0];
        this._activeTabIndex = 0;
        this.element.addEventListener('click', event => {
            this._activeTab = event.target;
            this.handleActivate(this._activeTab);
        })
    }

    /**
     * Возвращает HTML элемент.
     * @returns {HTMLElement}
     */
    get element() {
        return this._element;
    }

    /**
     * Возвращает массив вкладок.
     * @returns {Tab[]}
     */
    get tabs() {
        return this._tabs;
    }

    /**
     * Возвращает активную вкладку.
     * @returns {Tab}
     */
    get activeTab() {
        return this._activeTab;
    }

    /**
     * Возвращает индекс активной вкладки.
     * @returns {number}
     */
    get activeTabIndex() {
        return this._activeTabIndex;
    }

    /**
     * Вызывается при активации вкладки.
     * Делает все вкладки кроме активной неактивными.
     * Вызывает функцию обратно вызова, отправляя туда активную вкладку.
     * @private
     * @param {Tab} activeTab 
     */
    handleActivate(activeTab) {
        let tabs = this.tabs;
        this._activeTab = activeTab;
        tabs.forEach((tab, index, tabs) => {
            if(tab.element === activeTab) {
                this._activeTabIndex = index;
                tab.isActive = true;
                this.onChange(tab);
            } else {
                tab.isActive = false;
            }
        });
    }
}