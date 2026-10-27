import {type SchemaTypeDefinition} from 'sanity'

import {siteSettings} from './schemas/siteSettings'
import {experience} from './schemas/experience'
import {certificate} from './schemas/certificate'
import {skill} from './schemas/skill'
import {projectCategory} from './schemas/projectCategory'
import {project} from './schemas/project'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [siteSettings, experience, certificate, skill, projectCategory, project],
}
