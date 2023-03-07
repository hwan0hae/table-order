import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    containerColor: string;
    navBarColor: string;
    activeColor: string;
    borderLine: string;
  }
}
