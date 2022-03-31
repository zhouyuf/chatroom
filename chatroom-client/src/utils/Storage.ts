// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export const createStorage = ({prefixKey = '' , storage = sessionStorage} = {}) => {
  const Storage = class {
    private storage = storage;
    private prefixKey? : string = prefixKey;

    private getKey = (key: string) => {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire == null ? null : new Date().getTime() + expire * 1000
      })
      this.storage.setItem(key, stringData);
    }

    get(key: string, def: any = null) {
      const item = this.storage.getItem(key);
      if(item) {
        try{
          const data = JSON.parse(item);
          const {value, expire} = data;
          if(expire === null || expire >= Date.now()) {
            console.log(value);
            return value;
          }
          this.remove(this.getKey(key));
        }catch(e) {
          return def;
        }
      }
      return def;
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    clear() {
      this.storage.clear();
    }

  };
  return new Storage();
}

export const storage = createStorage();

