declare module "react" {
  export type ReactNode = any
  export type FC<P = {}> = (props: P) => ReactNode

  export interface Attributes {}

  export interface DOMAttributes<T> {
    children?: ReactNode
  }

  export interface HTMLAttributes<T> extends DOMAttributes<T> {
    className?: string
    id?: string
    style?: Record<string, string>
  }

  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string
    placeholder?: string
    value?: string | number | readonly string[] | undefined
    onChange?: (event: ChangeEvent<T>) => void
    autoFocus?: boolean
  }

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    onClick?: () => void
  }

  export interface ChangeEvent<T = Element> {
    target: EventTarget & { value: string }
  }

  export interface DetailedHTMLProps<E, T> extends E {}

  export function createElement(type: any, props: any, ...children: any[]): any
  export function useEffect(
    effect: () => void | (() => void),
    deps?: any[],
  ): void
  export function useRef<T>(initialValue: T): { current: T }
  export function useState<S>(initialState: S): [S, (newState: S) => void]
  export function useState(initialState: any): [any, (newState: any) => void]
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any
      span: any
      input: any
      h3: any
      p: any
      hr: any
      button: any
      a: any
      main: any
      header: any
    }
    interface Element {}
    interface ElementClass {}
    interface ElementAttributesProperty {
      props: {}
    }
  }
}
export {}
