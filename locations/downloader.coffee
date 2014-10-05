http = require 'http'
_ = require 'lodash'

QUERY_URL = 'http://services.arcgis.com/tNJpAOha4mODLkXz/arcgis/rest/services/RefuseHI5/FeatureServer/0/query?where=1%3D1&objectIds=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4001&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&f=pjson&token='
HoursProcessor = require('../hours-parser').HoursProcessor

class Loader
    hoursProcessor: new HoursProcessor()

    loadData: (contents) ->
        data = @processData contents
        @processLocations data

    fetch: (sourceUrl, completeCallback) ->
        request = http.request sourceUrl, (response) ->
            body = ""
            response.on 'data', (chunk) ->
                body += chunk

            response.on 'end', ->
                completeCallback body

        request.end()

    processData: (contents) ->
        JSON.parse contents

    processLocations: (data) ->
        locations = (@processLocation(l) for l in data.features)

    processLocation: (location) ->
        attributes = location.attributes
        attributes.id = attributes.OBJECTID;
        attributes.geometry = [location.geometry.x, location.geometry.y]
        attributes.hours = @hoursProcessor.processHours attributes.DAYS, attributes.HOURS
        if attributes.WEEKEND != " "
            _.extend attributes.hours, @hoursProcessor.processHours(attributes.WEEKEND, attributes.WEEKEND_HO)
        return attributes


loadIntoConsole = (url) ->
    loader = new Loader()
    loader.fetch url, (body) ->
        locations = loader.loadData body
        console.log JSON.stringify(locations, null, 2)

# Main method for loading data.
main = ->
    loadIntoConsole QUERY_URL

if require.main == module
    main()

else
    exports.Loader = Loader
    exports.JsonLoader = JsonLoader
