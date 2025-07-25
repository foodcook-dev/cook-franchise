import { reduce } from 'lodash'
import { ParameterType } from '../types/api'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSearchParams(obj: ParameterType = {}, base?: string) {
  const result = reduce(
    obj,
    (searchParams, value, key) => {
      if (value instanceof Array) {
        searchParams.delete(key)
        value.forEach((item) => {
          searchParams.append(key, item.toString())
        })
      } else if (value !== undefined && value !== null && value !== '') {
        searchParams.set(key, value.toString())
      } else {
        searchParams.delete(key)
      }

      return searchParams
    },
    new URLSearchParams(base)
  ).toString()

  return result === '' ? '' : `?${result}`
}

// export function createFormData(obj: BodyContentType = {}) {
//   return reduce(
//     obj,
//     (form, value, key) => {
//       if (value instanceof File) {
//         form.append(key, value);
//         return form;
//       }

//       if (value instanceof Array) {
//         const isFile = !!find(value, (item: string | number | File) => item instanceof File);

//         if (isFile) {
//           forEach(value, (item) => item instanceof File && form.append(key, item));
//           return form;
//         }
//       }

//       if (value !== undefined) form.append(key, JSON.stringify(value));

//       return form;
//     },
//     new FormData(),
//   );
// }
