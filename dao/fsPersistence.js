import fs from "fs";

class fsPersistence {
    constructor(path) {
        this.path = path
        this.data = []
        this._readFile()
    }

    static async _readFile() {
        
    }
}

export default fsPersistence