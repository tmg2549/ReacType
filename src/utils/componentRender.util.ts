import {
  ComponentInt,
  ComponentsInt,
  ChildInt,
  ChildrenInt,
  PropInt
} from './Interfaces';
import cloneDeep from './cloneDeep';

const componentRender = (
  component: ComponentInt,
  components: ComponentsInt
) => {
  const {
    childrenArray,
    title,
    props
  }: {
    childrenArray: ChildrenInt;
    title: string;
    props: PropInt[];
  } = component;

  function typeSwitcher(type: string) {
    switch (type) {
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'object':
        return 'object';
      case 'array':
        return 'any[]';
      case 'bool':
        return 'boolean';
      case 'function':
        return '() => any';
      // case 'symbol':
      //   return 'string';
      case 'node':
        return 'string';
      case 'element':
        return 'string';
      case 'tuple':
        return '[any]';
      case 'enum':
        return '{}';
      case 'any':
        return 'any';
      default:
        return 'any';
    }
  }

  /*
  Function: propDrillTextGenerator

  Input:  child - the element of type  'ChildInt' that is being added to the code preview

  Output: a string literal to be used in the code preview section fro the prop -drilled components and 
    the HTML attributes 
    
  Description: Fucntion that getnerates the code preview for both the prop drilled properties 
    as well as HTML attributes
    added a conditional that checks whether the html  prop is 'src' if so it doesnt 
    use htmlAttrSanitizer.
    This leaves special characters in the source link of the image
  */
  function propDrillTextGenerator(child: ChildInt) {
    if (child.childType === 'COMP') {
      return components
        .find((c: any) => c.id === child.childComponentId)
        .props.map((prop: PropInt) => `${prop.key}={${prop.value}}`)
        .join(' ');
    }
    if (child.childType === 'HTML') {
      const keys: string[] = Object.keys(child.HTMLInfo);
      return keys
        .map(key => {
          if (key !== 'src') {
            return `${key}='${htmlAttrSanitizer(child.HTMLInfo[key])}'`;
          } else {
            return `${key}='${child.HTMLInfo[key]}'`;
          }
        })
        .join(' ');
    }
    return '';
  }

  function htmlAttrSanitizer(element: string) {
    // TODO: debug localForage unhappiness to renable image imports
    // this shouldn't be needed, but some characters make localForage unhappy
    //Deleted touppercase for word[0] --Tony I
    return element
      .replace(/[a-z]+/gi, word => word[0] + word.slice(1))
      .replace(/[-_\s0-9\W]+/gi, '');
  }

  function componentNameGenerator(child: ChildInt) {
    if (child.childType === 'HTML') {
      switch (child.componentName) {
        case 'Image':
          return 'img';
        case 'Form':
          return 'form';
        case 'Button':
          return 'button';
        case 'Link':
          return 'a href=""';
        case 'List':
          return 'ul';
        case 'Paragraph':
          return 'p';
        default:
          return 'div';
      }
    } else {
      return child.componentName;
    }
  }

  return `
    import React from 'react';
    ${childrenArray
      .filter(child => child.childType !== 'HTML')
      .map(
        child =>
          `import ${child.componentName} from './${child.componentName}.tsx'`
      )
      .reduce((acc: Array<string>, child) => {
        if (!acc.includes(child)) {
          acc.push(child);
          return acc;
        }
        return acc;
      }, [])
      .join('\n')}

    
    type Props = {
      ${props.map(prop => `${prop.key}: ${typeSwitcher(prop.type)}\n`)}
    };

    // this function is making the actual HTML elements & passing down 
    // the HTML element names & attributes

    const ${title} = (props: Props) => {
      const {${props.map(el => el.key).join(', ')}} = props;
      
      return (
        <div>
        ${cloneDeep(childrenArray)
          .sort((a: ChildInt, b: ChildInt) => a.childSort - b.childSort)
          .map((child: ChildInt) => {
            console.log('this is child', child.componentName);
            if (child.componentName == 'Button') {
              return `
              <${componentNameGenerator(child)} ${propDrillTextGenerator(
                child
              )}></${componentNameGenerator(child)}>`;
            } else
              return `
              <${componentNameGenerator(child)} ${propDrillTextGenerator(
                child
              )}/>`;
          })
          .join('\n')}
        </div>
      );
    }
    export default ${title};
  `;
};

export default componentRender;
