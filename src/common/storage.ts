export const localStorageKey = 'zkz'

interface IStorage<T> {
  key: string
  defaultValue: T
}
export class SchoolStorage<T> implements IStorage<T> {
  key: string
  defaultValue: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(key: any, defaultValue: any) {
    this.key = localStorageKey + key
    this.defaultValue = defaultValue
  }

  setItem(value: T) {
    localStorage.setItem(this.key, window.btoa(encodeURIComponent(JSON.stringify(value))))
  }

  getItem(): T {
    const value =
      localStorage[this.key] &&
      decodeURIComponent(window.atob(localStorage.getItem(this.key) as unknown as string))
    if (value === undefined) return this.defaultValue
    try {
      return value && value !== 'null' && value !== 'undefined'
        ? (JSON.parse(value) as T)
        : this.defaultValue
    } catch (error) {
      return value && value !== 'null' && value !== 'undefined'
        ? (value as unknown as T)
        : this.defaultValue
    }
  }

  removeItem() {
    localStorage.removeItem(this.key)
  }
}

/** 管理token */
export const tokenStorage = new SchoolStorage<string>('token', '')

interface IUser {
  username?: string
  userId?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth?: any
  profilePhoto?: string
}
/** 管理user */
export const userStorage = new SchoolStorage<IUser>('user', {})

/** 只清除当前项目所属的本地存储 */
export const clearLocalStorage = () => {
  for (const key in localStorage) {
    if (key.includes(localStorageKey)) {
      localStorage.removeItem(key)
    }
  }
}
