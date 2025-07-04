// TypeScript definitions for styled-components can be extended by using declaration merging. So this file is a declaration file.
// This file overrisdes the files we installed before since we want to include the types that our themes are going to have.

// import original module declarations
import "styled-components";

// and extend the stype components' definition with my own theme.
declare module "styled-components" {
  export interface DefaultTheme {
    btnColor: string;
    textColor: string;
    bgColor: string;
  }
}
