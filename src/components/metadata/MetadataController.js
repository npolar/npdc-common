'use strict';

function MetadataController($scope, $http, $routeParams, npolarPeople) {
  'ngInject';
  
  const LICENSE = "https://creativecommons.org/publicdomain/zero/1.0/";
  
  // Metadata template
  let metadata =  { uri:null, id:$routeParams.id, formats:null, path:null, edits:null, editors:null, byline:null, license: LICENSE, schema: null };
  
  function name(email, people=npolarPeople) {
    if (!email || !people) { return; }
    let p = people.find(p => (p.email === email || (p.alias||[]).includes(email)));
    if (p) {
      if (p.name) {
       return p.name;
      } else {
        return `${p.first_name} ${p.last_name}`;
      }
    } else {
      return email;
    }
  }
  
  // Fetch edits from Editlog API
  let edits = (dataset, path) => {
    
    let edits = [];
    //let created = { action: 'create', user: { id: dataset.created_by, name: name(dataset.created_by) }, when: dataset.created, comment: null, revision: null };
    //let updated = { action: 'update', user: { id: dataset.updated_by, name: name(dataset.updated_by) }, when: dataset.updated, comment: null, revision: dataset._rev.split('-')[0] };
    
    let id = $routeParams.id;
    //edits[0] = created;
    //edits[1] = updated;
    
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
  
  $scope.document = $scope.document;
  let  document = $scope.document;
  
  // Set metadata from @metadata in <npdc:metadata metadata="{ 'license': 'URI'}"></npdc:metadata>
  Object.keys(metadata).forEach(p => {
    if ($scope.metadata && $scope.metadata[p]) {
      $scope[p]=$scope.metadata[p];
    }
  });
  
  if (!$scope.edits) {
    $scope.edits = [];
    let path = $scope.path; //.replace('//api.npolar.no', '');
    
    edits('', path).then(r => {
      r.data.forEach(e => {
        // hmm only pushing one at a time works, probably async/digest issue
        // @todo refactor
        let href = e.response.header.Location;
        let rev = href.split('rev=')[1];
        let revision = rev.split('-')[0]; 
        let edit = { action: 'update', user: { id: e.request.username, name: name(e.request.username)}, when: e.request.time, href, revision, rev };
        
        $scope.edits.push(edit);
        
      });
    });
  }
  
  $scope.editors = () => {
    return [...new Set($scope.edits.map(e => e.user.name))].filter(a => {
      return ((/ /).test(a));
    });
  };
  
  if (!$scope.creator) {
    $scope.creator = {
      id: document.created_by,
      name: name(document.created_by),
    };
  }
  
  if (!$scope.updater) {
    $scope.updater = {
      id: document.updated_by,
      name: name(document.updated_by)
    };
  }

  $scope.id = document.id;
  $scope.rev = document._rev;
  $scope.created = document.created;
  $scope.updated = document.updated;
  // @todo find and set newest
  // @todo warn also in bottom about old times...
  
}

module.exports = MetadataController;