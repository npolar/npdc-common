'use strict';

function MetadataController($scope, $http, $routeParams, $filter, $window, NpolarApiSecurity) {
  'ngInject';

  let ctrl = this;

  //const LICENSE = "https://creativecommons.org/publicdomain/zero/1.0/";
  ctrl.name = (email) => {
    if (!email) {
      return;
    }
    return $filter('name')(email);
  };

  ctrl.editUri = (id, resource) => NpolarApiSecurity.canonicalUri(resource.path+'/'+id);
  ctrl.path = (id, resource) => resource.uiBase+'/'+id;

  ctrl.metadata = (document, resource=$scope.resource, metadata=$scope.metadata) => {
    let href;
    let uri;
    let l = $window.location;
    let id = $routeParams.id;
    let base = `${l.protocol}//${l.host}`;
    if (resource) {
      href = ctrl.editUri(id, resource);
      uri = base+ctrl.path(id, resource);
    }
    let formats = [{ href, title: "JSON"}];
    return Object.assign({ uri, id: document.id, formats, schema: document.schema }, metadata||{});
  };

  // Fetch edits from Editlog API

  ctrl.edits = (dataset, path)=> {
    let id = $routeParams.id;

    let params = {
       q: '',
       limit: 'all',
       format: 'json',
       variant: 'array',
       sort: '-request.time',
       'filter-path': `${path}/${id}`,
       'filter-method': 'PUT',
       'filter-response.status': '200..299',
       //'filter-request.time': `${dataset.created}..${dataset.updated}`, only sensible if newest...
       fields: 'request.time,request.username,response.header.Location'
     };

    return $http.get('//api.npolar.no/editlog',{ params, cache: true});
  };

  let document = $scope.document || {};
  let resource = $scope.resource;

  if (document && resource) {
    $scope.metadata = ctrl.metadata(document, resource, $scope.metadata);
  }

  Object.keys($scope.metadata||{}).forEach(p => {
    if ($scope.metadata && $scope.metadata[p]) {
      $scope[p]=$scope.metadata[p];
    }
  });

  if (!$scope.edits && resource) {
    $scope.edits = [];
    let path = resource.path.split('//api.npolar.no')[1]; // FIXME Only works in production

    ctrl.edits(document||{}, path).then(r => {
      r.data.forEach(e => {
        // hmm only pushing one at a time works, probably async/digest issue
        // @todo refactor
        let href = e.response.header.Location;
        let rev = href.split('rev=')[1];
        let revision = rev.split('-')[0];
        let edit = { action: 'update', user: { id: e.request.username, name: ctrl.name(e.request.username)}, when: e.request.time, href, revision, rev };

        $scope.edits.push(edit);

      });
      // FIXME (create/revision 1 is pt impossible to GET from Editlog)
      if (document) {
        let created = { action: 'create', user: { id: document.created_by, name: ctrl.name(document.created_by) }, when: document.created, revision: '1' };
        $scope.edits.push(created);
      }


    });
  }

  $scope.editors = () => {
    if (!$scope.edits) {
      return;
    }
    return [...new Set($scope.edits.map(e => e.user.name))].filter(a => {
      return ((/ /).test(a));
    });
  };

  if (!$scope.creator && document) {
    $scope.creator = {
      id: document.created_by,
      name: ctrl.name(document.created_by),
    };
  }

  if (!$scope.updater && document) {
    $scope.updater = {
      id: document.updated_by,
      name: ctrl.name(document.updated_by)
    };
  }

  if (document) {
    $scope.id = document.id;
    $scope.rev = document._rev;
    $scope.created = document.created;
    $scope.created_by = document.created_by;
    $scope.updated = document.updated;
    $scope.updated_by = document.updated_by;
  }
  // @todo warn also in bottom about old times...
}

module.exports = MetadataController;