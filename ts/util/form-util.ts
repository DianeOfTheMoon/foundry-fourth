import { SafeString } from "handlebars";

export class FormUtil {
    public static RegisterHelpers() {
        Handlebars.registerHelper("CreateLabel", (options) => {
            return new Handlebars.SafeString(FormUtil.CreateLabel(options.hash["name"], options.hash["isFor"], options.hash["cssClass"], options.fn(this)));
        });
        Handlebars.registerHelper("CreateSelectbox", (options) => {
            return new Handlebars.SafeString(FormUtil.CreateSelectbox(options.hash["name"], options.hash["cssClass"], options.hash["value"], options.hash["options"]));
        });
        Handlebars.registerHelper("CreateText", (options) => {
            return new Handlebars.SafeString(FormUtil.CreateText(options.hash["name"], options.hash["cssClass"], options.hash["value"]));
        });
    }

    public static CreateLabel(name: string, isFor: string, cssClass: string | string[], internal: string): string {
        let output = `<label for="${isFor}">${name}:`;
        if (internal != null) {
            output += internal;
        }
        output += `</label>`;
        return output;
    }
    public static CreateSelectbox(name: string, cssClass: string | string[], value: string, options: Map<string, string>): string {
        cssClass = FormUtil.joinArray(cssClass);
        let output = `<select name="${name}" class="${cssClass}">`;
        options.forEach((optVal: string, key: string) => {
            let selected = "";
            if (value == key) {
                selected = ' selected="selected"';
            }
            output += `<option value="${key}"${selected}>${optVal}</option>`;
        });
        output += `</select>`;
        return output;
    }

    public static CreateText(name: string, cssClass: string | string[], value: string | number): string {
        cssClass = FormUtil.joinArray(cssClass);
        return `<input type="text" class="${cssClass}" name="${name}" value="${value}" />`;
    }

    public static CreateCheck(name: string, cssClass: string | string[], value: boolean): string {
        cssClass = FormUtil.joinArray(cssClass);
        let checked = "";
        if (value) {
            checked = ' checked="checked"';
        }
        return `<input type="checkbox" class="${cssClass}" name="${name}" value="true"${checked}/>`;
    }

    public static EnumToMap(enumValue: any): Map<string, string> {
        const output = new Map<string, string>();
        for (let [key, value] of Object.entries(enumValue)) {
            output.set((value as string), key.replace(/([a-z])([A-Z])/g, '$1 $2').trim());
        }
        return output;
    }

    public static joinArray(value: string | string[]): string {
        if (typeof value !== "string") {
            value = value.join(" ");
        }
        return value;
    }
}